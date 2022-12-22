import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import Course from "../models/Course";

const isCourseOwner = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (userId !== course?.instructor) {
        return res.status(StatusCodes.FORBIDDEN).json({ message: "You are not the owner of this course" });
    }

    next();
};

export default isCourseOwner;
