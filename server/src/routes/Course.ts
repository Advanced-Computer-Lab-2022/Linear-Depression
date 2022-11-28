import express from "express";
import controller from "../controllers/Course";
import ratingController from "../controllers/Rating";
import exerciseController from "../controllers/Exercise";
import authenticated from "../middleware/authenticated";

const router = express.Router();

router.get("/", controller.listCourses);
router.post("/", authenticated, controller.createCourse);
router.post("/:courseId/lesson", controller.createLesson);
router.get("/subjects", controller.listSubjects);
router.get("/:courseId", controller.readCourse);
router.put("/:courseId", controller.updateCourse);
router.delete("/:courseId", controller.deleteCourse);

router.get("/:courseId/ratings", ratingController.listRatings);
router.post("/:courseId/ratings", ratingController.createRating);
router.get("/:courseId/ratings/:ratingId", ratingController.readRating);
router.put("/:courseId/ratings/:ratingId", ratingController.updateRating);
router.delete("/:courseId/ratings/:ratingId", ratingController.deleteRating);

router.get("/:courseId/lessons/:lessonId/exercises", exerciseController.listExercises);
router.get("/:courseId/lessons/:lessonId/exercises/:exerciseId", exerciseController.readExercise);
router.post("/:courseId/lessons/:lessonId/exercises", exerciseController.createExercise);
router.put("/:courseId/lessons/:lessonId/exercises/:exerciseId", exerciseController.updateExercise);
router.delete("/:courseId/lessons/:lessonId/exercises/:exerciseId", exerciseController.deleteExercise);

router.get("/:courseId/lessons/:lessonId/exercises/:exerciseId/submissions", exerciseController.readSubmission);
router.post("/:courseId/lessons/:lessonId/exercises/:exerciseId/submissions", exerciseController.submitExercise);
export default router;
