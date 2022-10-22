import express from "express";
import controller from "../controllers/Course";

const router = express.Router();

router.get("/", controller.readAll);
router.post("/", controller.createCourse);
router.get("/:courseId", controller.readCourse);
router.put("/:courseId", controller.updateCourse);

export = router;
