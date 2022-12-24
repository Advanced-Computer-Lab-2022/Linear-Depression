import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Course from "../models/Course";
import User from "../models/User";
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

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: course.title
                    },
                    unit_amount: Math.ceil(course.price * 100)
                },
                quantity: 1
            }
        ],
        client_reference_id: userId,
        customer_email: user.email,
        mode: "payment",
        success_url: `${process.env.FRONT_END_URL}/courses/${courseId}`,
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

    console.log(event);

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        console.log(session);
        console.log(session.client_reference_id);
        console.log(session.customer_email);
    }

    res.json({ received: true });
};

export default { createCheckoutSession, stripeWebhook };
