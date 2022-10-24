import express from "express";
import controller from "../controllers/Instructor";

const router = express.Router();

router.get("/", controller.listInstructors);
router.post("/", controller.createInstructor);
router.get("/:instructorId", controller.readInstructor);
router.put("/:instructorId", controller.updateInstructor);
router.delete("/:instructorId", controller.deleteInstructor);

export default router;
