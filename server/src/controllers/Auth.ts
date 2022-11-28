import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserTypes } from "../enums/UserTypes";
import UserServices from "../services/UserServices";
import { decodeToken } from "../utils/auth/token";

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    return UserServices.login(email, password)
        .then((token: string) => {
            res.cookie("token", token, { httpOnly: true });
            res.status(StatusCodes.OK).json({ type: decodeToken(token)?.type });
        })
        .catch((error: any) => res.status(StatusCodes.UNAUTHORIZED).json({ error }));
};

const getRole = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    return UserServices.getUserType(token)
        .then((type: UserTypes) => {
            res.status(StatusCodes.OK).json({ type });
        })
        .catch((error: any) => res.status(StatusCodes.UNAUTHORIZED).json({ error }));
}

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { token, newPassword } = req.body;

    return UserServices.resetPassword(token, newPassword)
        .then(() => res.status(StatusCodes.OK).json({ success: true }))
        .catch((error: any) => res.status(StatusCodes.UNAUTHORIZED).json({ error }));
}

export default {
    login,
    getRole,
    resetPassword
};
