import express from "express";
import controller from "../controllers/Course";
import ratingController from "../controllers/Rating";

const router = express.Router();

router.get("/", controller.listCourses);
router.post("/", controller.createCourse);
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

export default router;
