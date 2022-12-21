import express from "express";
import controller from "../controllers/Instructor";
import ratingController from "../controllers/InstructorRating";
import authenticated from "../middleware/isAuthenticated";

const router = express.Router();

router.get("/", controller.listInstructors);
router.post("/", controller.createInstructor);
router.get("/:instructorId", controller.readInstructor);
router.put("/:instructorId", controller.updateInstructor);
router.delete("/:instructorId", controller.deleteInstructor);

router.post("/:instructorId/ratings", authenticated, ratingController.createRating);
router.delete("/:instructorId/ratings/:ratingId", authenticated, ratingController.deleteRating);

export default router;
