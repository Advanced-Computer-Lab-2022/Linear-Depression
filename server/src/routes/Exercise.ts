import express from "express";
import controller from "../controllers/Exercise";

const router = express.Router();

router.get("/exercises", controller.listExercises);
router.get("/exercises/:exerciseId", controller.readExercise);
router.post("/exercise", controller.createExercise);
router.put("/exercises/:exerciseId", controller.updateExercise);
router.delete("/exercises/:exerciseId", controller.deleteExercise);

router.get("/exercises/:exerciseId/submissions", controller.readSubmission);
router.post("/exercises/:exerciseId/submissions", controller.submitExercise);

export default router;
