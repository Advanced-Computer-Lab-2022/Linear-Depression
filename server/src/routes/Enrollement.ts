import express from "express";
import enrollementController from "../controllers/Enrollement";
import authenticated from "../middleware/authenticated";

const router = express.Router();

router.get("/:enrollementId", authenticated, enrollementController.readEnrollement);
router.put("/:enrollementId", authenticated, enrollementController.updateEnrollement);

export default router;
