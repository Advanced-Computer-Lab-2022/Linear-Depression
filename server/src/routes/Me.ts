import express from "express";
import courseController from "../controllers/Course";
import profileController from "../controllers/Profile";
import noteRouter from "../controllers/Note";
import isAuthenticated from "../middleware/isAuthenticated";
import enrollmentController from "../controllers/Enrollment";
import instructorRatingController from "../controllers/InstructorRating";
import reportController from "../controllers/Report";

const router = express.Router();

router.get("/courses", isAuthenticated, courseController.listMyCourses);

router.get("/enrollments", isAuthenticated, enrollmentController.readMyEnrollments);

router.get("/lessons/:lessonId/notes", isAuthenticated, noteRouter.readNote);
router.get("/lessons/:lessonId/notes/:noteId/pdf", isAuthenticated, noteRouter.saveAsPDF);
router.post("/lessons/:lessonId/notes", isAuthenticated, noteRouter.createNote);
router.put("/lessons/:lessonId/notes/:noteId", isAuthenticated, noteRouter.updateNote);

router.get("/ratings", isAuthenticated, instructorRatingController.listRatings);
router.get("/profile", isAuthenticated, profileController.readProfile);
router.put("/profile", isAuthenticated, profileController.updateProfile);

router.get("/reports", isAuthenticated, reportController.listReportsByUser);
router.get("/reports/:reportId", isAuthenticated, reportController.getReport);
router.post("/reports", isAuthenticated, reportController.createReport);
router.post("/reports/:reportId", isAuthenticated, reportController.addThreadReply);

export default router;
