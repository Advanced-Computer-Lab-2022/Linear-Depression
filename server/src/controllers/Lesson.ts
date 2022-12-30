import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Course from "../models/Course";
import Lesson from "../models/Lesson";

const createLesson = async (req: Request, res: Response, _next: NextFunction) => {
    const courseId = req.params.courseId;
    const lesson = new Lesson({
        ...req.body
    });
    lesson
        .save()
        .then((lesson) => {
            Course.findByIdAndUpdate(courseId, { $push: { lessons: lesson._id } }).then(() => {
                res.status(StatusCodes.CREATED).json({ lesson });
            });
        })
        .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error: error.message }));
};

const readLesson = async (req: Request, res: Response, _next: NextFunction) => {
    const lessonId = req.params.lessonId;

    return Lesson.findById(lessonId)
        .then((lesson) => {
            if (!lesson) {
                return res.status(StatusCodes.NOT_FOUND).json({ error: "Lesson not found" });
            }
            return res.status(StatusCodes.OK).json({ lesson });
        })
        .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error: error.message }));
};

const updateLesson = async (req: Request, res: Response, _next: NextFunction) => {
    const lessonId = req.params.lessonId;

    return Lesson.findById(lessonId)
        .then((lesson) => {
            if (lesson) {
                lesson.set(req.body);

                return lesson
                    .save()
                    .then((lesson) => res.status(StatusCodes.OK).json({ lesson }))
                    .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ error: "Lesson not found" });
            }
        })
        .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error: error.message }));
};

const deleteLesson = async (req: Request, res: Response, _next: NextFunction) => {
    const lessonId = req.params.lessonId;
    return Lesson.findByIdAndDelete(lessonId)
        .then((lesson) => {
            if (lesson) {
                return res.status(StatusCodes.OK).json({ message: "Lesson deleted Successfully" });
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "Lesson not found" });
            }
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message }));
};

export default {
    createLesson,
    readLesson,
    updateLesson,
    deleteLesson
};
