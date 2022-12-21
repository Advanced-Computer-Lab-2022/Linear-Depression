import crypto from "crypto";
import { UserTypes } from "../enums/UserTypes";
import PasswordResetToken from "../models/PasswordResetToken";
import User from "../models/User";
import {
    createRefreshToken,
    createAccessToken,
    verifyRefreshToken,
    decodeToken,
    TokenPayload
} from "../utils/auth/token";

export default class UserServices {
    static login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }> {
        return new Promise(async (resolve, reject) => {
            const user = await User.findOne({ email });

            if (!user || !user.isCorrectPassword(password)) {
                return reject({
                    status: 401,
                    message: "Wrong email or password"
                });
            }

            resolve({
                accessToken: createAccessToken(user),
                refreshToken: createRefreshToken(user)
            });
        });
    }

    static refresh(refreshToken: string): Promise<string> {
        return new Promise((resolve, reject) => {
            verifyRefreshToken(refreshToken)
                .then((accessToken: string) => {
                    resolve(accessToken);
                })
                .catch((error: Error) => {
                    reject(error);
                });
        });
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
