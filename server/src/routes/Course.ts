import express from "express";
import controller from "../controllers/Course";
import ratingController from "../controllers/CourseRating";
import exerciseController from "../controllers/Exercise";
import lessonController from "../controllers/Lesson";
import accessRequestController from "../controllers/AccessRequest";
import { UserType } from "../enums/UserTypes";
import isAuthenticated from "../middleware/permissions/isAuthenticated";
import isAuthorized from "../middleware/permissions/isAuthorized";
import isCourseOwner from "../middleware/permissions/isCourseOwner";
import isEnrolled from "../middleware/permissions/isEnrolled";
import isOwnerOrEnrolled from "../middleware/permissions/isOwnerOrEnrolled";
import isRatingOwner from "../middleware/permissions/isRatingOwner";

const router = express.Router();

// all users
router.get("/", controller.listCourses);
router.get("/subjects", controller.listSubjects);
router.get("/:courseId", controller.readCourse);
router.get("/:courseId/ratings", ratingController.listRatings);
router.get(
    "/:courseId/my-ratings",
    isAuthenticated,
    isAuthorized([UserType.INDIVIDUAL_TRAINEE, UserType.CORPORATE_TRAINEE]),
    isRatingOwner,
    ratingController.readRating
);

// instructor
router.post("/", isAuthenticated, isAuthorized([UserType.INSTRUCTOR]), controller.createCourse);

// instructor and owner
router.put("/:courseId", isAuthenticated, isAuthorized([UserType.INSTRUCTOR]), isCourseOwner, controller.updateCourse);
router.delete(
    "/:courseId",
    isAuthenticated,
    isAuthorized([UserType.INSTRUCTOR]),
    isCourseOwner,
    controller.deleteCourse
);
router.post(
    "/:courseId/lessons",
    isAuthenticated,
    isAuthorized([UserType.INSTRUCTOR]),
    isCourseOwner,
    lessonController.createLesson
);
router.put(
    "/:courseId/lessons/:lessonId",
    isAuthenticated,
    isAuthorized([UserType.INSTRUCTOR]),
    isCourseOwner,
    lessonController.updateLesson
);
router.post(
    "/:courseId/lessons/:lessonId/exercises",
    isAuthenticated,
    isAuthorized([UserType.INSTRUCTOR]),
    isCourseOwner,
    exerciseController.createExercise
);
router.put(
    "/:courseId/lessons/:lessonId/exercises/:exerciseId",
    isAuthenticated,
    isAuthorized([UserType.INSTRUCTOR]),
    isCourseOwner,
    exerciseController.updateExercise
);
router.delete(
    "/:courseId/lessons/:lessonId/exercises/:exerciseId",
    isAuthenticated,
    isAuthorized([UserType.INSTRUCTOR]),
    isCourseOwner,
    exerciseController.deleteExercise
);

// trainee and enrolled
router.get(
    "/:courseId/lessons/:lessonId",
    isAuthenticated,
    isAuthorized([UserType.CORPORATE_TRAINEE, UserType.INDIVIDUAL_TRAINEE]),
    isEnrolled,
    lessonController.readLesson
);
router.post(
    "/:courseId/ratings",
    isAuthenticated,
    isAuthorized([UserType.CORPORATE_TRAINEE, UserType.INDIVIDUAL_TRAINEE]),
    isEnrolled,
    isAuthenticated,
    ratingController.createRating
);
router.get(
    "/:courseId/lessons/:lessonId/exercises/:exerciseId/submissions",
    isAuthenticated,
    isAuthorized([UserType.CORPORATE_TRAINEE, UserType.INDIVIDUAL_TRAINEE]),
    isEnrolled,
    exerciseController.readSubmission
);
router.post(
    "/:courseId/lessons/:lessonId/exercises/:exerciseId/submissions",
    isAuthenticated,
    isAuthorized([UserType.CORPORATE_TRAINEE, UserType.INDIVIDUAL_TRAINEE]),
    isEnrolled,
    exerciseController.submitExercise
);

// trainee and owner
router.put(
    "/:courseId/ratings/:ratingId",
    isAuthenticated,
    isAuthorized([UserType.CORPORATE_TRAINEE, UserType.INDIVIDUAL_TRAINEE]),
    isRatingOwner,
    ratingController.updateRating
);
router.delete(
    "/:courseId/ratings/:ratingId",
    isAuthenticated,
    isAuthorized([UserType.CORPORATE_TRAINEE, UserType.INDIVIDUAL_TRAINEE]),
    isRatingOwner,
    ratingController.deleteRating
);

// trainee and enrolled or Instructor and owner
router.get(
    "/:courseId/lessons/:lessonId/exercises",
    isAuthenticated,
    isAuthorized([UserType.INSTRUCTOR, UserType.CORPORATE_TRAINEE, UserType.INDIVIDUAL_TRAINEE]),
    isOwnerOrEnrolled,
    exerciseController.listExercises
);
router.get(
    "/:courseId/lessons/:lessonId/exercises/:exerciseId",
    isAuthenticated,
    isAuthorized([UserType.INSTRUCTOR, UserType.CORPORATE_TRAINEE, UserType.INDIVIDUAL_TRAINEE]),
    isOwnerOrEnrolled,
    exerciseController.readExercise
);

// corporate trainee
router.post(
    "/:courseId/access-requests",
    isAuthenticated,
    isAuthorized([UserType.CORPORATE_TRAINEE]),
    accessRequestController.createAccessRequest
);

export default router;
