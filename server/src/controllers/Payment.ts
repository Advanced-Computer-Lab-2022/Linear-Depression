import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Course from "../models/Course";
import IndividualTrainee from "../models/IndividualTrainee";
import Promotion, { PromotionStatus } from "../models/Promotion";
import User from "../models/User";
import { getCoursePriceAfterPromotion } from "../services/CourseServices";
import { createEnrollmentService } from "../services/EnrollmentCreateServices";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req: Request, res: Response, _next: NextFunction) => {
    const { userId, courseId } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Course not found" });
    }

    const trainee = await IndividualTrainee.findById(userId);

    if (!trainee) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Trainee not found" });
    }

    let coursePriceAfterPromotion = await getCoursePriceAfterPromotion(course);

    const discounts = [];
    let amount_off = 0;

    if (trainee.wallet > 0) {
        amount_off = Math.min(trainee.wallet, coursePriceAfterPromotion);

        const coupon = await stripe.coupons.create({
            amount_off: Math.ceil(amount_off * 100),
            duration: "once",
            currency: "usd"
        });
        discounts.push({ coupon: coupon.id });
    } else if (course.activePromotion) {
        const promotion = await Promotion.findById(course.activePromotion);
        if (promotion && promotion.status === PromotionStatus.ACTIVE) {
            const coupon = await stripe.coupons.create({ percent_off: promotion.discountPercent, duration: "once" });
            discounts.push({ coupon: coupon.id });
        }
        coursePriceAfterPromotion = course.price;
    }

    if (coursePriceAfterPromotion <= 0.5 || coursePriceAfterPromotion - amount_off <= 0.5) {
        createEnrollmentService(userId, courseId)
            .then((enrollment) => {
                IndividualTrainee.findById(userId).then(async (trainee) => {
                    if (!trainee) {
                        return res.status(StatusCodes.NOT_FOUND).json({ message: "trainee not found" });
                    }
                    trainee.enrollments.push(enrollment._id);
                    await trainee.debit(amount_off);
                });

                console.log("Enrollment created");
            })
            .catch((err: any) => {
                console.log(err);
            });
        return res.status(StatusCodes.OK).json({ url: `${process.env.FRONT_END_URL}/payment/success/${courseId}` });
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: course.title,
                        images: [course.thumbnail]
                    },
                    unit_amount: Math.ceil(coursePriceAfterPromotion * 100)
                },
                quantity: 1
            }
        ],
        metadata: {
            courseId,
            userId,
            amount_off
        },
        customer_email: trainee.email,
        mode: "payment",
        ...(discounts.length && { discounts }),
        success_url: `${process.env.FRONT_END_URL}/payment/success/${courseId}`,
        cancel_url: `${process.env.FRONT_END_URL}/payment/cancel`
    });

    res.json({ url: session.url, id: session.id });
};

const stripeWebhook = async (req: Request, res: Response, _next: NextFunction) => {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err: any) {
        console.log(err.message);
        return res.status(StatusCodes.BAD_REQUEST).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const { courseId, userId, amount_off } = session.metadata;

        createEnrollmentService(userId, courseId)
            .then((enrollment) => {
                IndividualTrainee.findById(userId).then(async (trainee) => {
                    if (!trainee) {
                        return res.status(StatusCodes.NOT_FOUND).json({ message: "trainee not found" });
                    }
                    trainee.enrollments.push(enrollment._id);
                    await trainee.debit(amount_off);
                });

                console.log("Enrollment created");
                res.json({ received: true, payment: "success", enrollment: true });
            })
            .catch((err: any) => {
                console.log(err);
                res.json({ received: true, payment: "success", enrollment: false, message: "Enrollment not created" });
            });
    } else {
        res.json({ received: true, payment: "failed" });
    }
};

export default { createCheckoutSession, stripeWebhook };
