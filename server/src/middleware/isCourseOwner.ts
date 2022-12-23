import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import Course from "../models/Course";

const isCourseOwner = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.userId as unknown as mongoose.Types.ObjectId;
    const courseId = req.body.courseId as unknown as mongoose.Types.ObjectId;

    const course = await Course.findById(courseId);
    if (!course) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Course not found" });
    }

    if (userId.toString() !== course.instructor.toString()) {
        return res.status(StatusCodes.FORBIDDEN).json({ message: "You are not the owner of this course" });
    }

    next();
};

export default isCourseOwner;
