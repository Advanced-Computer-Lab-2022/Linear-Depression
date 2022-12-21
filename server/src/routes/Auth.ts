import express from "express";
import AuthController from "../controllers/Auth";
import PasswordResetTokenController from "../controllers/PasswordResetToken";
import authenticated from "../middleware/isAuthenticated";
import isAuthenticated from "../middleware/isAuthenticated";
import rateLimiter from "../middleware/rateLimiter";

const router = express.Router();

router.post("/login", rateLimiter(5), AuthController.login);
router.get("/refresh", AuthController.refresh);
router.post("/logout", isAuthenticated, AuthController.logout);
router.post("/forgot", PasswordResetTokenController.sendPasswordResetToken);
router.get("/reset", PasswordResetTokenController.validatePasswordResetToken);
router.post("/reset", AuthController.resetPassword);
router.post("/change", authenticated, AuthController.changePassword);

export default router;
