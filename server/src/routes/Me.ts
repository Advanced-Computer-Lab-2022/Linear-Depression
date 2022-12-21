import express from "express";
import courseController from "../controllers/Course";
import profileController from "../controllers/Profile";
import isAuthenticated from "../middleware/isAuthenticated";
import instructorRatingController from "../controllers/InstructorRating";

const router = express.Router();

router.get("/courses", isAuthenticated, courseController.listMyCourses);

router.get("/ratings", isAuthenticated, instructorRatingController.listRatings);
router.get("/profile", isAuthenticated, profileController.readProfile);
router.put("/profile", isAuthenticated, profileController.updateProfile);

export default router;
