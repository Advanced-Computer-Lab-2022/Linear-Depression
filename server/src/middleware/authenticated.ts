import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { TokenPayload, verifyToken } from "../utils/auth/token";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const decoded: TokenPayload | jwt.JsonWebTokenError = await verifyToken(token);
        if (decoded instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        req.body.userId = decoded.id;
        req.body.userType = decoded.type;

        next();
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized" });
    }
};
