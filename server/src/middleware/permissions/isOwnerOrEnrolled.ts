import { Request, Response, NextFunction } from "express";
import { UserType } from "../../enums/UserTypes";
import isCourseOwner from "./isCourseOwner";
import isEnrolled from "./isEnrolled";

const isOwnerOrEnrolled = (req: Request, res: Response, next: NextFunction) => {
    const { userType } = req.body;

    if (userType === UserType.INSTRUCTOR) {
        return isCourseOwner(req, res, next);
    } else if (userType === UserType.CORPORATE_TRAINEE || userType === UserType.INDIVIDUAL_TRAINEE) {
        return isEnrolled(req, res, next);
    }
};

export default isOwnerOrEnrolled;
