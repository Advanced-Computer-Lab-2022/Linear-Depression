import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import Course, { CourseStatus, ICourse, ICourseModel } from "../models/Course";
import Instructor, { IInstructorModel } from "../models/Instructor";
import { getCurrencyCode, getCurrencyRateFromCache } from "../services/CourseServices";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { UserType } from "../enums/UserTypes";
import CorporateTrainee from "../models/CorporateTrainee";
import IndividualTrainee from "../models/IndividualTrainee";
import Enrollment from "../models/Enrollment";

async function getCurrencyRateByCookie(
    req: Request,
    baseCountry: string
): Promise<{ currencyRate: number; currency: any }> {
    const country: string = req.cookies.country || "us";
    const currency: string = await getCurrencyCode(country);
    const baseCurrency: string = await getCurrencyCode(baseCountry);
    const currencyRate: number = await getCurrencyRateFromCache(currency, baseCurrency);
    return { currencyRate, currency };
}

const createCourse = async (req: Request, res: Response, _next: NextFunction) => {
    const { currencyRate }: { currencyRate: number; currency: any } = await getCurrencyRateByCookie(req, "us");

    const course = new Course({
        _id: new mongoose.Types.ObjectId(),
        ...req.body,
        instructor: req.body.userId
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

const listCourses = async (req: Request, res: Response) => {
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

const listMyCourses = async (req: Request, res: Response, _next: NextFunction) => {
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
    const userType = req.body.userType;
    if (userType === UserType.INSTRUCTOR) {
        req.query.instructor = req.body.userId;
    } else if (userType === UserType.CORPORATE_TRAINEE) {
        const corporateTrainee = await CorporateTrainee.findById(req.body.userId);
        if (corporateTrainee) {
            const courses = [];
            for (const enrollmentId of corporateTrainee.enrollments) {
                const enrollment = await Enrollment.findById(enrollmentId);
                if (enrollment) {
                    courses.push(enrollment.courseId);
                }
            }

            req.query["_id"] = { $in: courses } as any;
        }
    } else {
        const individualTrainee = await IndividualTrainee.findById(req.body.userId);
        if (individualTrainee) {
            const courses = [];
            for (const enrollmentId of individualTrainee.enrollments) {
                const enrollment = await Enrollment.findById(enrollmentId);
                if (enrollment) {
                    courses.push(enrollment.courseId);
                }
            }

            req.query["_id"] = { $in: courses } as any;
        }
    }

    if (searchTerm) {
        // search by instructor
        // try to find instructor by name
        // @ts-ignore
        await Instructor.fuzzySearch(searchTerm).then((instructors) => {
            if (instructors.length > 0) {
                // if instructor found, search by instructor
                return searchWithInstructors(instructors, req, currencyRate, res, currency, true);
            } else {
                return searchWithTitleSubject(searchTerm, req, currencyRate, res, currency, true);
            }
        });
    } else {
        return listCoursesOnlyFilter(req, currencyRate, res, currency, true);
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
        .populate({
            path: "activePromotion",
            select: "name discountPercent startDate endDate",
            match: { startDate: { $lte: new Date() }, endDate: { $gte: new Date() } }
        })
        .then((course) => {
            if (course) {
                course.price = course.price * currencyRate;
                res.status(StatusCodes.OK).json({ course: { ...course.toObject({ virtuals: true }), currency } });
            } else {
                res.status(StatusCodes.NOT_FOUND).json({ message: "not found" });
            }
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const updateCourse = async (req: Request, res: Response, _next: NextFunction) => {
    const courseId = req.params.courseId;

    return Course.findById(courseId)
        .then((course) => {
            if (course) {
                if (course.status === CourseStatus.PUBLISHED) {
                    return res.status(StatusCodes.BAD_REQUEST).json({ message: "course is published" });
                }

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

const deleteCourse = async (req: Request, res: Response, _next: NextFunction) => {
    const courseId = req.params.courseId;

    return Course.findByIdAndDelete(courseId)
        .then((course) => {
            if (course) {
                if (course.status !== CourseStatus.DRAFT) {
                    return res.status(StatusCodes.BAD_REQUEST).json({ message: "course is published" });
                }
                return res.status(StatusCodes.OK).json({ message: "Course is deleted Successfully" });
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "Course Not found" });
            }
        })

        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const listSubjects = async (req: Request, res: Response, _next: NextFunction) => {
    req.query.status = CourseStatus.PUBLISHED;
    return Course.find(req.query)
        .distinct("subject")
        .then((subjects) => res.status(StatusCodes.OK).json({ subjects }))
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

async function searchWithTitleSubject(
    searchTerm: string,
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    currencyRate: number,
    res: Response<any, Record<string, any>>,
    currency: string,
    skipPublishCheck: boolean = false
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
        .populate({
            path: "activePromotion",
            select: "name discountPercent startDate endDate",
            match: { startDate: { $lte: new Date() }, endDate: { $gte: new Date() } }
        })
        .then((courses) => {
            if (!skipPublishCheck) {
                courses = courses.filter((course) => course.status === CourseStatus.PUBLISHED);
            }
            adjustCoursePrice(courses, currencyRate);
            const coursesWithCurrency = courses.map((course) => ({ ...course.toObject({ virtuals: true }), currency }));
            res.status(StatusCodes.OK).json({ courses: coursesWithCurrency });
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
}

async function searchWithInstructors(
    instructors: IInstructorModel[],
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    currencyRate: number,
    res: Response<any, Record<string, any>>,
    currency: string,
    skipPublishCheck: boolean = false
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
        .populate({
            path: "activePromotion",
            select: "name discountPercent startDate endDate",
            match: { startDate: { $lte: new Date() }, endDate: { $gte: new Date() } }
        })
        .then((courses) => {
            if (!skipPublishCheck) {
                courses = courses.filter((course) => course.status === CourseStatus.PUBLISHED);
            }
            adjustCoursePrice(courses, currencyRate);
            const coursesWithCurrency = courses.map((course: ICourseModel) => {
                return { ...course.toObject({ virtuals: true }), currency };
            });
            res.status(StatusCodes.OK).json({ courses: coursesWithCurrency });
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
}

async function listCoursesOnlyFilter(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    currencyRate: number,
    res: Response<any, Record<string, any>>,
    currency: string,
    skipPublishCheck: boolean = false
) {
    let sortOptions = {};
    if (req.query.sort) {
        if (req.query.sort === "popularity") {
            sortOptions = { enrollmentsCount: -1 };
        } else if (req.query.sort === "new") {
            sortOptions = { createdAt: -1 };
        }
    }

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
        .populate({
            path: "activePromotion",
            select: "name discountPercent startDate endDate",
            match: { startDate: { $lte: new Date() }, endDate: { $gte: new Date() } }
        })
        .sort(sortOptions)
        .then((courses) => {
            if (!skipPublishCheck) {
                courses = courses.filter((course) => course.status === CourseStatus.PUBLISHED);
            }
            adjustCoursePrice(courses, currencyRate);
            const coursesWithCurrency = courses.map((course: ICourseModel) => {
                return { ...course.toObject({ virtuals: true }), currency };
            });
            res.status(StatusCodes.OK).json({ courses: coursesWithCurrency });
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
}

const closeCourse = async (req: Request, res: Response, _next: NextFunction) => {
    const courseId = req.params.courseId;
    return Course.findById(courseId).then((course) => {
        course?.close().then((_course) => {
            res.status(StatusCodes.OK).json({ message: "Course closed successfully" });
        });
    });
};

const publishCourse = async (req: Request, res: Response, _next: NextFunction) => {
    const courseId = req.params.courseId;
    return Course.findById(courseId).then((course) => {
        course?.publish().then((_course) => {
            res.status(StatusCodes.OK).json({ message: "Course published successfully" });
        });
    });
};

const reOpenCourse = async (req: Request, res: Response, _next: NextFunction) => {
    const courseId = req.params.courseId;
    return Course.findById(courseId).then((course) => {
        course?.reOpen().then((_course) => {
            res.status(StatusCodes.OK).json({ message: "Course re-opened successfully" });
        });
    });
};

export default {
    listCourses,
    createCourse,
    readCourse,
    updateCourse,
    deleteCourse,
    listSubjects,
    listMyCourses,
    closeCourse,
    publishCourse,
    reOpenCourse
};
