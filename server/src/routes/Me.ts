import express from "express";
import courseController from "../controllers/Course";
import profileController from "../controllers/Profile";
import authenticated from "../middleware/authenticated";
import instructorRatingController from "../controllers/InstructorRating";
import reportController from "../controllers/Report";

const router = express.Router();

router.get("/courses", authenticated, courseController.listMyCourses);

router.get("/ratings", authenticated, instructorRatingController.listRatings);
router.get("/profile", authenticated, profileController.readProfile);
router.put("/profile", authenticated, profileController.updateProfile);

router.get("/reports", authenticated, reportController.listReportsByUser);
router.get("/reports/:reportId", authenticated, reportController.getReport);
router.post("/reports", authenticated, reportController.createReport);
router.post("/reports/:reportId", authenticated, reportController.addThreadReply);

export default router;
