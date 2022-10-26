import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import Course from "../models/Course";
import { getCurrencyCode, getCurrencyRate } from "../services/CourseServices";

async function getCurrencyRateByCookie(req: Request): Promise<{ currencyRate: number; currency: any }> {
    const language: string = req.cookies.language || "usaf";
    const currency: string = getCurrencyCode(language);
    const currencyRate: number = await getCurrencyRate(currency);
    return { currencyRate, currency };
}
const createCourse = (req: Request, res: Response, _next: NextFunction) => {
    const course = new Course({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });

    return course
        .save()
        .then((course) => res.status(StatusCodes.CREATED).json({ course }))
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const listCourses = async (req: Request, res: Response, _next: NextFunction) => {
    const { currencyRate, currency }: { currencyRate: number; currency: any } = await getCurrencyRateByCookie(req);
    try {
        const courses = await Course.find(req.query).populate("instructor", "firstName lastName").populate("ratings");
        for (const course of courses) {
            course.price = Math.ceil(course.price * currencyRate * 100) / 100;
        }
        const courseWithCurrency = courses.map((course) => {
            return {
                ...course.toObject(),
                currency
            };
        });
        return res.status(StatusCodes.OK).json({ courses: courseWithCurrency });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

const readCourse = async (req: Request, res: Response, _next: NextFunction) => {
    const courseId = req.params.courseId;
    const { currencyRate, currency }: { currencyRate: number; currency: any } = await getCurrencyRateByCookie(req);

    return Course.findById(courseId)
        .populate("instructor", "firstName lastName")
        .populate("ratings")
        .then((course) => {
            if (course) {
                course.price = course.price * currencyRate;
                return res.status(StatusCodes.OK).json({ course: { ...course.toObject(), currency } });
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "not found" });
            }
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const updateCourse = (req: Request, res: Response, _next: NextFunction) => {
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

const deleteCourse = (req: Request, res: Response, _next: NextFunction) => {
    const courseId = req.params.courseId;

    return Course.findByIdAndDelete(courseId)
        .then((course) =>
            course
                ? res.status(StatusCodes.OK).json({ course, message: "Deleted" })
                : res.status(StatusCodes.NOT_FOUND).json({ message: "not found" })
        )
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const listSubjects = (req: Request, res: Response, _next: NextFunction) => {
    return Course.find(req.query)
        .distinct("subject")
        .then((subjects) => res.status(StatusCodes.OK).json({ subjects }))
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

export default { listCourses, createCourse, readCourse, updateCourse, deleteCourse, listSubjects };