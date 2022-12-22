import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { UserType } from "../enums/UserTypes";
import CorporateTrainee from "../models/CorporateTrainee";
import Enrollment from "../models/Enrollment";
import IndividualTrainee from "../models/IndividualTrainee";

const isEnrolled = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, userType } = req.body;
    const { courseId } = req.params;

    let user;

    if (userType === UserType.CORPORATE_TRAINEE) {
        user = await CorporateTrainee.findById(userId);
    } else if (userType === UserType.INDIVIDUAL_TRAINEE) {
        user = await IndividualTrainee.findById(userId);
    }

    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: "User not found"
        });
    }

    for (const enrollmentId of user.enrollments) {
        const enrollment = await Enrollment.findById(enrollmentId);
        if (enrollment?.courseId.toString() === courseId) {
            return next();
        }
    }

    res.status(StatusCodes.FORBIDDEN).json({
        message: "You are not enrolled in this course"
    });
};

export default isEnrolled;
