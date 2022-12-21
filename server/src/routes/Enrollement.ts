import express from "express";
import enrollementController from "../controllers/Enrollement";
import isAuthenticated from "../middleware/isAuthenticated";

const router = express.Router();

router.get("/:enrollementId", isAuthenticated, enrollementController.readEnrollement);
router.put("/:enrollementId", isAuthenticated, enrollementController.updateEnrollement);

export default router;
