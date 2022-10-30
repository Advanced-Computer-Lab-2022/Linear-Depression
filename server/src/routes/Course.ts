import express from "express";
import controller from "../controllers/Course";

const router = express.Router();

router.get("/", controller.listCourses);
router.post("/", controller.createCourse);
router.post("/:courseId/add-lesson", controller.createLesson);
router.get("/subjects", controller.listSubjects);
router.get("/:courseId", controller.readCourse);
router.put("/:courseId", controller.updateCourse);
router.delete("/:courseId", controller.deleteCourse);

export default router;
