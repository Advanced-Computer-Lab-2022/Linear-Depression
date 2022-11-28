import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { decodeToken, TokenPayload } from "../utils/auth/token";

export const getUserType = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    const decodedToken: TokenPayload   = decodeToken(token) as TokenPayload;

    res.status(StatusCodes.OK).json({ decodedToken });
}