import express from "express";
import controller from "../controllers/Instructor";
import ratingController from "../controllers/InstructorRating";
import authenticated from "../middleware/authenticated";

const router = express.Router();

router.get("/", controller.listInstructors);
router.post("/", controller.createInstructor);
router.get("/:instructorId", controller.readInstructor);
router.put("/:instructorId", controller.updateInstructor);
router.delete("/:instructorId", controller.deleteInstructor);

router.post("/:instructorId/ratings", authenticated, ratingController.createRating);

export default router;
