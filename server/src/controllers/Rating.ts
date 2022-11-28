import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import Rating from "../models/Rating";
import CorporateTrainee from "../models/CorporateTrainee";
import IndividualTrainee from "../models/IndividualTrainee";
import Course, { ICourse } from "../models/Course";

const createRating = async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.courseId;

    // if traineeId is provided, make sure it exists in the db in either IndividualTrainee or CorporateTrainee
    if (req.body.traineeID) {
        const traineeId = req.body.traineeID;
        if (!mongoose.Types.ObjectId.isValid(traineeId)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Invalid traineeId"
            });
        }
        const individualTrainee = await IndividualTrainee.findById(traineeId);
        const corporateTrainee = await CorporateTrainee.findById(traineeId);
        if (!individualTrainee && !corporateTrainee) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Invalid traineeId"
            });
        }
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "traineeId is required"
        });
    }

    return new Rating(req.body)
        .save()
        .then((rating) => {
            Course.findByIdAndUpdate(courseId, { $push: { ratings: rating._id } })
                .then(() => {
                    res.status(StatusCodes.CREATED).json({ rating });
                })
                .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
        })
        .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
};

const listRatings = async (req: Request, res: Response, next: NextFunction) => {
    // filter only ratings that are have comments
    const courseId = req.params.courseId;
    await Course.findById(courseId).then((course) => {
        if (!course) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Course not found"
            });
        }
        const ratings = course?.ratings;
        if (ratings) {
            Rating.find({ _id: { $in: ratings }, comment: { $exists: true } })
                .populate("IndividualTrainee")
                .populate("CorporateTrainee")
                .then((ratings) => {
                    res.status(StatusCodes.OK).json({ ratings });
                })
                .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
        } else {
            res.status(StatusCodes.OK).json({ ratings: [] });
        }
    });
};

const readRating = async (req: Request, res: Response, next: NextFunction) => {
    const ratingId = req.params.ratingId as unknown as mongoose.Types.ObjectId;
    const courseId = req.params.courseId;
    const course = (await Course.findById(courseId).then((course) => {
        if (!course) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Course not found"
            });
        }
        return course as ICourse;
    })) as ICourse;
    return Rating.findById(ratingId)
        .populate("IndividualTrainee", "firstName lastName")
        .populate("CorporateTrainee", "firstName lastName")
        .then((rating) => {
            if (!rating) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "Rating not found"
                });
            }
            if (!course.ratings.includes(ratingId)) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Rating does not belong to this course"
                });
            }
            return res.status(StatusCodes.OK).json({ rating });
        })
        .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
};

const updateRating = async (req: Request, res: Response, next: NextFunction) => {
    const ratingId = req.params.ratingId as unknown as mongoose.Types.ObjectId;
    const courseId = req.params.courseId;

    const course: ICourse = (await Course.findById(courseId).then((course) => {
        if (!course) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Course not found"
            });
        }
        return course;
    })) as ICourse;
    if (!course.ratings.includes(ratingId)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Rating does not belong to this course"
        });
    }

    // validate traineeId
    if (req.body.traineeID) {
        const traineeId = req.body.traineeID;
        if (!mongoose.Types.ObjectId.isValid(traineeId)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Invalid traineeId"
            });
        }
        const individualTrainee = IndividualTrainee.findById(traineeId);
        const corporateTrainee = CorporateTrainee.findById(traineeId);
        if (!individualTrainee && !corporateTrainee) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Invalid traineeId"
            });
        }
    }

    Rating.findById(ratingId)
        .then((rating) => {
            if (rating) {
                rating.set(req.body);

                return rating
                    .save()
                    .then((rating) => res.status(StatusCodes.OK).json({ rating }))
                    .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "not found" });
            }
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const deleteRating = (req: Request, res: Response, next: NextFunction) => {
    const ratingId = req.params.ratingId;
    const courseId = req.params.courseId;

    return Rating.findByIdAndDelete(ratingId)
        .then((rating) =>
            rating
                ? res.status(StatusCodes.OK).json({ rating })
                : res.status(StatusCodes.NOT_FOUND).json({ message: "not found" })
        )
        .then(() => {
            Course.findByIdAndUpdate(courseId, { $pull: { ratings: ratingId } }).catch((error) =>
                res.status(StatusCodes.BAD_REQUEST).json({ error })
            );
        })
        .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
};

export default {
    createRating,
    listRatings,
    readRating,
    updateRating,
    deleteRating
};
