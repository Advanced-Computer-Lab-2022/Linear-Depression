import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Course from "../models/Course";
import Promotion, { PromotionStatus } from "../models/Promotion";
import User from "../models/User";
import { createEnrollmentService } from "../services/EnrollmentCreateServices";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req: Request, res: Response, _next: NextFunction) => {
    const { userId, courseId } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Course not found" });
    }

    const user = await User.findById(userId);

    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    }

    const discounts = [];

    if (course.activePromotion) {
        const promotion = await Promotion.findById(course.activePromotion);
        if (!promotion) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Promotion not found" });
        }
        if (promotion.status === PromotionStatus.Active) {
            const coupon = await stripe.coupons.create({ percent_off: promotion.discountPercent, duration: "once" });
            discounts.push({ coupon: coupon.id });
        }
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
                    unit_amount: Math.ceil(course.price * 100)
                },
                quantity: 1
            }
        ],
        metadata: {
            courseId,
            userId
        },
        customer_email: user.email,
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
        const { courseId, userId } = session.metadata;

        createEnrollmentService(userId, courseId)
            .then(() => {
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
