import express from "express";
import AuthController from "../controllers/Auth";
import PasswordResetTokenController from "../controllers/PasswordResetToken";

const router = express.Router();

router.post("/login", AuthController.login);
router.get("/role", AuthController.getRole);
router.post("/forgot", PasswordResetTokenController.sendPasswordResetToken);
router.get("/reset", PasswordResetTokenController.validatePasswordResetToken);
router.post("/reset", AuthController.resetPassword);

export default router;
