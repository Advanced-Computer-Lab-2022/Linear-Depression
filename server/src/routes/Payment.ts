import express from "express";
import Controller from "../controllers/Payment";
import isAuthenticated from "../middleware/isAuthenticated";

const router = express.Router();

router.post("/create-checkout-session", isAuthenticated, Controller.createCheckoutSession);
router.post("/stripe-webhook", Controller.stripeWebhook);

export default router;
