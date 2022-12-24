import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req: Request, res: Response, _next: NextFunction) => {
    const { courseId } = req.body;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "T-shirt"
                    },
                    unit_amount: 2000
                },
                quantity: 1
            }
        ],
        mode: "payment",
        success_url: `${process.env.FRONT_END_URL}/success`,
        cancel_url: `${process.env.FRONT_END_URL}/cancel`
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
    }

    res.json({ received: true });
};

export default { createCheckoutSession, stripeWebhook };
