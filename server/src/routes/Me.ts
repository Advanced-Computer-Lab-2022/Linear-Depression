import express from "express";
import courseController from "../controllers/Course";
import profileController from "../controllers/Profile";
import isAuthenticated from "../middleware/isAuthenticated";
import enrollementController from "../controllers/Enrollement";
import instructorRatingController from "../controllers/InstructorRating";
import reportController from "../controllers/Report";

const router = express.Router();

router.get("/courses", isAuthenticated, courseController.listMyCourses);

router.get("/enrollements", isAuthenticated, enrollementController.readMyEnrollements);

router.get("/ratings", isAuthenticated, instructorRatingController.listRatings);
router.get("/profile", isAuthenticated, profileController.readProfile);
router.put("/profile", isAuthenticated, profileController.updateProfile);

router.get("/reports", isAuthenticated, reportController.listReportsByUser);
router.get("/reports/:reportId", isAuthenticated, reportController.getReport);
router.post("/reports", isAuthenticated, reportController.createReport);
router.post("/reports/:reportId", isAuthenticated, reportController.addThreadReply);

export default router;
