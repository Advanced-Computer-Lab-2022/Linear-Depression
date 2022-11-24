import express from "express";
import controller from "../controllers/Exercise";

const router = express.Router();

router.get("/:lessonId/", controller.listExercises);
router.delete("/:lessonId/:exerciseId", controller.deleteExercise);
router.get("/:lessonId/add-exercise", controller.createExercise);

export default router;
