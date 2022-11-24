import express from "express";
import controller from "../controllers/Exercise";

const router = express.Router();

router.get("/:exerciseId", controller.readExercise);
router.put("/:exerciseId", controller.updateExercise);
router.get("/:exerciseId/evaluate", controller.evaluateExercise);

export default router;
