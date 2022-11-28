import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import PasswordResetToken from "../models/PasswordResetToken";
import User from "../models/User";
import PasswordResetTokenServices from "../services/PasswordResetTokenServices";
import { sendPasswordResetEmail } from "../utils/sendPasswordResetEmail";

const sendPasswordResetToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
        }

        const passwordResetToken = new PasswordResetToken({
            userId: user._id,
            token: PasswordResetTokenServices.generateToken(),
            expiredBy: new Date(Date.now() + 3_600_000)
        });

        passwordResetToken.save()
        .then(() => {
            sendPasswordResetEmail(email, passwordResetToken.token);
            return res.status(StatusCodes.OK).json({ success: true });
        })
        .catch((error) => {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

const validatePasswordResetToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.query;
        const passwordResetToken = await PasswordResetToken.findOne({ token });

        if (!passwordResetToken) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized" });
        }

        if (!passwordResetToken.isValid()) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Expired Reset URL" });
        }

        const user = await User.findById(passwordResetToken.userId);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
        }

        return res.status(StatusCodes.OK).json({ success: true, email: user.email });
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized" });
    }
};

export default {
    sendPasswordResetToken,
    validatePasswordResetToken
};
