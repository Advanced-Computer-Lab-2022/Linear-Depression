import express from "express";
import controller from "../controllers/Instructor";
import ratingController from "../controllers/InstructorRating";
import authenticated from "../middleware/permissions/isAuthenticated";

const router = express.Router();

router.get("/", controller.listInstructors);
router.post("/", controller.createInstructor);
router.get("/:instructorId", controller.readInstructor);
router.put("/:instructorId", controller.updateInstructor);
router.delete("/:instructorId", controller.deleteInstructor);

router.post("/:instructorId/ratings", authenticated, ratingController.createRating);
router.delete("/:instructorId/ratings/:ratingId", authenticated, ratingController.deleteRating);
router.post("/:instructorId/ratings/:ratingId", authenticated, ratingController.updateRating);
router.get("/:instructorId/ratings", ratingController.getCourseRating);

export default router;
