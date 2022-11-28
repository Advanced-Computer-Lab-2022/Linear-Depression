import express from "express";
import courseController from "../controllers/Course";
import authenticated from "../middleware/authenticated";

const router = express.Router();

router.get("/courses", authenticated, courseController.listMyCourses);

export default router;
