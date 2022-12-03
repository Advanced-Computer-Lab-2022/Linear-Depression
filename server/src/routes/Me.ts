import express from "express";
import courseController from "../controllers/Course";
import authenticated from "../middleware/authenticated";
import instructorRatingController from "../controllers/InstructorRating";

const router = express.Router();

router.get("/courses", authenticated, courseController.listMyCourses);

router.get("/ratings", authenticated, instructorRatingController.listRatings);

export default router;
