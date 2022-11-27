import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserServices from "../services/UserServices";

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    return UserServices.login(email, password)
        .then((token: string) => {
            res.cookie("token", token, { httpOnly: true });
            res.status(StatusCodes.OK).json({ token });
        })
        .catch((error: any) => res.status(StatusCodes.UNAUTHORIZED).json({ error }));
};

export default {
    login
};
