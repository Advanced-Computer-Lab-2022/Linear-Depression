import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import Course, { ICourse, ICourseModel } from "../models/Course";
import Instructor, { IInstructorModel } from "../models/Instructor";
import { getCurrencyCode, getCurrencyRate } from "../services/CourseServices";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import Lesson from "../models/Lesson";

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
    console.log(country);
    const { currencyRate, currency }: { currencyRate: number; currency: any } = await getCurrencyRateByCookie(
        req,
        "us"
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
    delete req.query.searchTerm;
    //adjust price in query
    if (req.query.price) {
        const price = JSON.parse(JSON.stringify(req.query.price));
        const minPrice = price["$gte"] ? price["$gte"] / currencyRate : 0;
        const maxPrice = price["$lte"] ? price["$lte"] / currencyRate : 100000;
        req.query.price = { $gte: minPrice, $lte: maxPrice } as any;
    }
    if (searchTerm) {
        // search by instructor
        // try to find instructor by name
        // @ts-ignore
        await Instructor.fuzzySearch(searchTerm).then((instructors) => {
            if (instructors.length > 0) {
                // if instructor found, search by instructor
                return searchWithInstructors(instructors, req, currencyRate, res, currency);
            } else {
                return searchWithTitleSubject(searchTerm, req, currencyRate, res, currency);
            }
        });
    } else {
        return listCoursesOnlyFilter(req, currencyRate, res, currency);
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
        .populate({
            path: "lessons",
            populate: {
                path: "exercises",
                model: "Exercise"
            }
        })
        .populate("activePromotion", "name discountPercent startDate endDate")
        .then((course) => {
            if (course) {
                course.price = course.price * currencyRate;
                res.status(StatusCodes.OK).json({ course: { ...course.toObject(), currency } });
            } else {
                res.status(StatusCodes.NOT_FOUND).json({ message: "not found" });
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

const createLesson = async (req: Request, res: Response, next: NextFunction) => {
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
        .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
};

function searchWithTitleSubject(
    searchTerm: string,
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    currencyRate: number,
    res: Response<any, Record<string, any>>,
    currency: string
) {
    return Course.fuzzySearch(searchTerm, req.query)
        .populate("instructor", "firstName lastName")
        .populate("ratings")
        .populate({
            path: "lessons",
            populate: {
                path: "exercises",
                model: "Exercise"
            }
        })
        .populate("activePromotion", "name discountPercent startDate endDate")
        .then((courses) => {
            adjustCoursePrice(courses, currencyRate);
            const coursesWithCurrency = courses.map((course) => ({ ...course.toObject(), currency }));
            res.status(StatusCodes.OK).json({ courses: coursesWithCurrency });
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
}

function searchWithInstructors(
    instructors: IInstructorModel[],
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    currencyRate: number,
    res: Response<any, Record<string, any>>,
    currency: string
) {
    return Course.find({
        instructor: { $in: instructors.map((instructor: IInstructorModel) => instructor._id) },
        ...req.query
    })
        .populate("instructor", "firstName lastName")
        .populate("ratings")
        .populate({
            path: "lessons",
            populate: {
                path: "exercises",
                model: "Exercise"
            }
        })
        .populate("activePromotion", "name discountPercent startDate endDate")
        .then((courses) => {
            adjustCoursePrice(courses, currencyRate);
            const coursesWithCurrency = courses.map((course: ICourseModel) => {
                return { ...course.toObject(), currency };
            });
            res.status(StatusCodes.OK).json({ courses: coursesWithCurrency });
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
}

function listCoursesOnlyFilter(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    currencyRate: number,
    res: Response<any, Record<string, any>>,
    currency: string
) {
    return Course.find(req.query)
        .populate("instructor", "firstName lastName")
        .populate("ratings")
        .populate({
            path: "lessons",
            populate: {
                path: "exercises",
                model: "Exercise"
            }
        })
        .populate("activePromotion", "name discountPercent startDate endDate")
        .then((courses) => {
            adjustCoursePrice(courses, currencyRate);
            const coursesWithCurrency = courses.map((course: ICourseModel) => {
                return { ...course.toObject(), currency };
            });
            res.status(StatusCodes.OK).json({ courses: coursesWithCurrency });
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
}

export default { listCourses, createCourse, readCourse, updateCourse, deleteCourse, listSubjects, createLesson };
