import express from "express";
import enrollmentController from "../controllers/Enrollment";
import isAuthenticated from "../middleware/permissions/isAuthenticated";

const router = express.Router();

router.get("/:enrollmentId", isAuthenticated, enrollmentController.readEnrollment);
router.put("/:enrollmentId", isAuthenticated, enrollmentController.updateEnrollment);

export default router;
