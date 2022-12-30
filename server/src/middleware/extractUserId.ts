import { Request, Response, NextFunction } from "express";
import { TokenPayload, verifyAccessToken } from "../utils/auth/token";

const extractUserId = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || (req.headers.Authorization as string);

    if (!authHeader?.startsWith("Bearer ")) {
        next();
    }

    const token = authHeader.split(" ")[1];

    verifyAccessToken(token)
        .then((decoded: TokenPayload) => {
            req.body.userId = decoded.id;
            req.body.userType = decoded.userType;
            next();
        })
        .catch((error: any) => next());
};

export default extractUserId;
