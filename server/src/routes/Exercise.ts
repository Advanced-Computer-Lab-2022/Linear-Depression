import express from "express";
import controller from "../controllers/Exercise";

const router = express.Router();

router.get("/exercises", controller.listExercises);
router.get("/exercises/:exerciseId", controller.readExercise);
router.get("/exercises/:exerciseId/answers", controller.evaluateExercise);
router.post("/exercise", controller.createExercise);
router.post("/exercises/:exerciseId/answers", controller.submitExercise);
router.put("/exercises/:exerciseId", controller.updateExercise);
router.delete("/exercises/:exerciseId", controller.deleteExercise);

export default router;
