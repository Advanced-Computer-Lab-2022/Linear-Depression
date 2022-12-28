import express from "express";
import controller from "../controllers/Instructor";
import ratingController from "../controllers/InstructorRating";
import { UserType } from "../enums/UserTypes";
import isAuthenticated from "../middleware/permissions/isAuthenticated";
import isAuthorized from "../middleware/permissions/isAuthorized";

const router = express.Router();

router.get("/", controller.listInstructors);
router.post("/", controller.createInstructor);
router.get("/:instructorId", controller.readInstructor);
router.put("/:instructorId", controller.updateInstructor);
router.delete("/:instructorId", controller.deleteInstructor);

router.post("/:instructorId/ratings", isAuthenticated, ratingController.createRating);
router.delete("/:instructorId/ratings/:ratingId", isAuthenticated, ratingController.deleteRating);
router.post("/:instructorId/ratings/:ratingId", isAuthenticated, ratingController.updateRating);
router.get(
    "/:instructorId/my-rating",
    isAuthenticated,
    isAuthorized([UserType.CORPORATE_TRAINEE, UserType.INDIVIDUAL_TRAINEE]),
    ratingController.getCourseRating
);

export default router;
