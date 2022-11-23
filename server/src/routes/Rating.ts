import express from "express";
import controller from "../controllers/Rating";
const router = express.Router();

router.get("/", controller.listRatings);
router.post("/", controller.createRating);
router.get("/:ratingId", controller.readRating);
router.put("/:ratingId", controller.updateRating);
router.delete("/:ratingId", controller.deleteRating);

export default router;
