import express from "express";
import Controller from "../controllers/Promotion";

const router = express.Router();

router.get("/", Controller.listPromotions);
router.get("/:promotionId", Controller.getPromotion);
router.post("/", Controller.createPromotion);
router.put("/:promotionId", Controller.updatePromotion);
router.delete("/:promotionId", Controller.deletePromotion);

export default router;
