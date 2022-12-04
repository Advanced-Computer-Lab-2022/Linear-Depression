import crypto from "crypto";
import { UserTypes } from "../enums/UserTypes";
import PasswordResetToken from "../models/PasswordResetToken";
import User from "../models/User";
import { createToken, decodeToken, TokenPayload } from "../utils/auth/token";

export default class UserServices {
    static async login(email: string, password: string) {
        try {
            const user = await User.findOne({ email });

            if (!user || !user.isCorrectPassword(password)) {
                throw new Error();
            }

            return createToken(user);
        } catch (error) {
            throw new Error("Wrong email or password");
        }
    }

    static async getUserType(token: string) {
        if (token) {
            const decodedToken: TokenPayload = decodeToken(token) as TokenPayload;
            return decodedToken.type;
        } else {
            return UserTypes.GUEST;
        }
    }

    static async resetPassword(token: string, newPassword: string) {
        try {
            const passwordResetToken = await PasswordResetToken.findOne({
                token: crypto
                    .createHash("sha256")
                    .update(token as string)
                    .digest("hex")
            });
            if (!passwordResetToken) {
                throw new Error();
            }

            const user = await User.findById(passwordResetToken.userId);
            if (!user) {
                throw new Error();
            }

            user.passwordHash = newPassword;

            await user.save();
        } catch (error) {
            throw new Error("Failed to reset password");
        }
    }

    static async changePassword(userId: string, oldPassword: string, newPassword: string) {
        try {
            const user = await User.findById(userId);
            if (!user || !user.isCorrectPassword(oldPassword)) {
                throw new Error();
            }

            user.passwordHash = newPassword;

            await user.save();
        } catch (error) {
            throw new Error("Failed to change password");
        }
    }
}
