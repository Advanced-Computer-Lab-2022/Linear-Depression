import express from "express";
import courseController from "../controllers/Course";
import profileController from "../controllers/Profile";
import enrollementController from "../controllers/Enrollement";
import noteRouter from "../controllers/Note";
import authenticated from "../middleware/authenticated";
import instructorRatingController from "../controllers/InstructorRating";

const router = express.Router();

router.get("/courses", authenticated, courseController.listMyCourses);

router.get("/enrollements", authenticated, enrollementController.readMyEnrollements);

router.get("/lessons/:lessonId/notes", authenticated, noteRouter.readNote);
router.get("/lessons/:lessonId/notes/:noteId/pdf", authenticated, noteRouter.getPDF);
router.post("/lessons/:lessonId/notes", authenticated, noteRouter.createNote);
router.put("/lessons/:lessonId/notes/:noteId", authenticated, noteRouter.updateNote);

router.get("/ratings", authenticated, instructorRatingController.listRatings);
router.get("/profile", authenticated, profileController.readProfile);
router.put("/profile", authenticated, profileController.updateProfile);

export default router;
