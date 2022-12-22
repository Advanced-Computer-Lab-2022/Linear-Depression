import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserServices from "../services/UserServices";

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Missing email or password" });
    }

    return UserServices.login(email, password)
        .then((data) => {
            res.cookie("jwt", data.refreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            console.log("TESTTSET");

            res.status(StatusCodes.OK).json({
                accessToken: data.accessToken,
                userType: data.userType
            });
        })
        .catch((error: any) => res.status(error.status).json({ message: error.message }));
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies?.jwt;

    if (!refreshToken) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Missing refresh token" });
    }

    UserServices.refresh(refreshToken)
        .then((data) => {
            res.status(StatusCodes.OK).json({
                accessToken: data.accessToken,
                userType: data.userType
            });
        })
        .catch((error: any) => res.status(error.status).json({ error: error.message }));
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies?.jwt) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Missing refresh token" });
    }
    res.clearCookie("jwt", { httpOnly: true });
    res.status(StatusCodes.OK).json({ message: "Logout successful" });
};

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { token, newPassword } = req.body;

    return UserServices.resetPassword(token, newPassword)
        .then(() => res.status(StatusCodes.OK).json({ success: true }))
        .catch((error: any) => res.status(StatusCodes.UNAUTHORIZED).json({ error }));
};

const changePassword = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, oldPassword, newPassword } = req.body;

    return UserServices.changePassword(userId, oldPassword, newPassword)
        .then(() => res.status(StatusCodes.OK).json({ success: true }))
        .catch((error: any) => res.status(StatusCodes.UNAUTHORIZED).json({ error }));
};

export default {
    login,
    refresh,
    logout,
    resetPassword,
    changePassword
};
