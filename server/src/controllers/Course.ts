import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import Course, { ICourse } from "../models/Course";
import Instructor from "../models/Instructor";
import { getCurrencyCode, getCurrencyRate } from "../services/CourseServices";

async function getCurrencyRateByCookie(
    req: Request,
    baseCountry: string
): Promise<{ currencyRate: number; currency: any }> {
    const country: string = req.cookies.country || "us";
    const currency: string = getCurrencyCode(country);
    const baseCurrency: string = getCurrencyCode(baseCountry);
    const currencyRate: number = await getCurrencyRate(currency, baseCurrency);
    return { currencyRate, currency };
}
const createCourse = async (req: Request, res: Response, _next: NextFunction) => {
    // check his cookie
    const country: string = req.cookies.country || "us";
    const { currencyRate, currency }: { currencyRate: number; currency: any } = await getCurrencyRateByCookie(
        req,
        country
    );

    const course = new Course({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });

    course.price = course.price / currencyRate;
    try {
        await course.save();
        return res.status(StatusCodes.CREATED).json({ course });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

const adjustCoursePrice = (courses: ICourse[], currencyRate: number) => {
    courses.forEach((course) => {
        course.price = course.price * currencyRate;
        course.price = Math.ceil(course.price * 100) / 100;
    });
};

const listCourses = async (req: Request, res: Response, next: NextFunction) => {
    const { currencyRate, currency }: { currencyRate: number; currency: any } = await getCurrencyRateByCookie(
        req,
        "us"
    );
    const searchTerm = req.query.searchTerm as string;
    console.log(req.query);
    delete req.query.searchTerm;
    console.log(searchTerm);
    if (searchTerm) {
        // search by instructor
        // try to find instructor by name
        await Instructor.fuzzySearch(searchTerm).then((instructors) => {
            if (instructors.length > 0) {
                // if instructor found, search by instructor
                return Course.find({ instructor: { $in: instructors.map((instructor) => instructor._id) } })
                    .populate("instructor", "firstName lastName")
                    .populate("ratings")
                    .populate("lessons")
                    .populate({
                        path: "lessons",
                        populate: {
                            path: "exercises",
                            model: "Exercise"
                        }
                    })
                    .then((courses) => {
                        adjustCoursePrice(courses, currencyRate);
                        return res.status(StatusCodes.OK).json({ courses, currency });
                    })
                    .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
            }
        });
        return Course.fuzzySearch(searchTerm, req.query)
            .populate("instructor", "firstName lastName")
            .populate("ratings")
            .populate("lessons")
            .populate({
                path: "lessons",
                populate: {
                    path: "exercises",
                    model: "Exercise"
                }
            })
            .then((courses) => {
                adjustCoursePrice(courses, currencyRate);
                return res.status(StatusCodes.OK).json({ courses, currency });
            })
            .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
    } else {
        return Course.find(req.query)
            .populate("instructor", "firstName lastName")
            .populate("ratings")
            .populate("lessons")
            .populate({
                path: "lessons",
                populate: {
                    path: "exercises",
                    model: "Exercise"
                }
            })
            .then((courses) => {
                adjustCoursePrice(courses, currencyRate);
                return res.status(StatusCodes.OK).json({ courses, currency });
            })
            .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
    }
};
const readCourse = async (req: Request, res: Response, _next: NextFunction) => {
    const courseId = req.params.courseId;
    const { currencyRate, currency }: { currencyRate: number; currency: any } = await getCurrencyRateByCookie(
        req,
        "us"
    );

    return Course.findById(courseId)
        .populate("instructor", "firstName lastName")
        .populate("ratings")
        .populate("lessons")
        .populate({
            path: "lessons",
            populate: {
                path: "exercises",
                model: "Exercise"
            }
        })
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
