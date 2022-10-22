import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Course from "../models/Course";

const createCourse = (req: Request, res: Response, next: NextFunction) => {
    const { title, description, instructor, subject, price, averageRating, rating, totalHours, preview, lessons } =
        req.body;

    const course = new Course({
        _id: new mongoose.Types.ObjectId(),
        title,
        description,
        instructor,
        subject,
        price,
        averageRating,
        rating,
        totalHours,
        preview,
        lessons
    });

    return course
        .save()
        .then((course) => res.status(201).json({ course }))
        .catch((error) => res.status(500).json({ error }));
};

export default { createCourse };
