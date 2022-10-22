import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Course from "../models/Course";

const createCourse = (req: Request, res: Response, next: NextFunction) => {
    const course = new Course({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });

    return course
        .save()
        .then((course) => res.status(201).json({ course }))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Course.find()
        .then((courses) => res.status(200).json({ courses }))
        .catch((error) => res.status(500).json({ error }));
};

const readCourse = (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.courseId;

    return Course.findById(courseId)
        .then((course) => (course ? res.status(200).json({ course }) : res.status(404).json({ message: "not found" })))
        .catch((error) => res.status(500).json({ error }));
};

const updateCourse = (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.courseId;

    return Course.findById(courseId)
        .then((course) => {
            if (course) {
                course.set(req.body);

                return course
                    .save()
                    .then((course) => res.status(201).json({ course }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: "not found" });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteCourse = (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.courseId;

    return Course.findByIdAndDelete(courseId)
        .then((course) =>
            course
                ? res.status(201).json({ course, message: "Deleted" })
                : res.status(404).json({ message: "not found" })
        )
        .catch((error) => res.status(500).json({ error }));
};

export default { readAll, createCourse, readCourse, updateCourse, deleteCourse };
