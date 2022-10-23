import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import Course from "../models/Course";

const createCourse = (req: Request, res: Response, next: NextFunction) => {
    const course = new Course({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });

    return course
        .save()
        .then((course) => res.status(StatusCodes.CREATED).json({ course }))
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const listCourses = (req: Request, res: Response, next: NextFunction) => {
    return Course.find(req.query)
        .populate("instructor", "firstName lastName")
        .populate("ratings")
        .then((courses) => res.status(StatusCodes.OK).json({ courses }))
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const readCourse = (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.courseId;

    return Course.findById(courseId)
        .populate("instructor", "firstName lastName")
        .populate("ratings")
        .then((course) =>
            course
                ? res.status(StatusCodes.OK).json({ course })
                : res.status(StatusCodes.NOT_FOUND).json({ message: "not found" })
        )
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const updateCourse = (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.courseId;

    return Course.findById(courseId)
        .then((course) => {
            if (course) {
                course.set(req.body);

                return course
                    .save()
                    .then((course) => res.status(StatusCodes.CREATED).json({ course }))
                    .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "not found" });
            }
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const deleteCourse = (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.courseId;

    return Course.findByIdAndDelete(courseId)
        .then((course) =>
            course
                ? res.status(StatusCodes.CREATED).json({ course, message: "Deleted" })
                : res.status(StatusCodes.NOT_FOUND).json({ message: "not found" })
        )
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

export default { listCourses, createCourse, readCourse, updateCourse, deleteCourse };
