import { Request, Response, NextFunction } from "express";
import { UserType } from "../enums/UserTypes";

const isAuthorized = (roles: UserType[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.userType) {
            res.status(401).json({ message: "Unauthorized" });
        }

        if (roles.includes(req.body.userType)) {
            next();
        } else {
            res.status(403).json({ message: "Forbidden" });
        }
    };
};

export default isAuthorized;
