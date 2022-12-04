import express from "express";
import AuthController from "../controllers/Auth";
import PasswordResetTokenController from "../controllers/PasswordResetToken";
import authenticated from "../middleware/authenticated";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/role", AuthController.getRole);
router.post("/forgot", PasswordResetTokenController.sendPasswordResetToken);
router.get("/reset", PasswordResetTokenController.validatePasswordResetToken);
router.post("/reset", AuthController.resetPassword);
router.post("/change", authenticated, AuthController.changePassword);

export default router;
