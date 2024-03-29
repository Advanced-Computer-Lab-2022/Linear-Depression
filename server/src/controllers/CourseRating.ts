import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import Rating, { IRatingModel } from "../models/Rating";
import CorporateTrainee from "../models/CorporateTrainee";
import IndividualTrainee from "../models/IndividualTrainee";
import Course, { ICourse, ICourseModel } from "../models/Course";

const createRating = async (req: Request, res: Response) => {
    const courseId = req.params.courseId;

    const traineeId = req.body.userId;
    if (traineeId) {
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
    // if there's existing rating for this trainee and course, return error
    const courseHavingRatings = (await Course.findById(courseId).populate({
        path: "ratings",
        match: { traineeId: traineeId }
    })) as ICourse;
    if (courseHavingRatings.ratings.length > 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Rating already exists for this trainee and course"
        });
    }
    req.body.traineeId = traineeId;
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

const listRatings = async (req: Request, res: Response) => {
    // filter only ratings that are have comments
    const courseId = req.params.courseId;
    await Course.findById(courseId).then(async (course) => {
        if (!course) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Course not found"
            });
        }
        const ratings = course?.ratings;
        if (ratings) {
            await Rating.find({ _id: { $in: ratings }, comment: { $exists: true } })
                .populate("IndividualTrainee", "firstName lastName")
                .populate("CorporateTrainee", "firstName lastName")
                .then((ratings) => {
                    const ratingsWithTrainee = serializeRatingTrainee(ratings);
                    res.status(StatusCodes.OK).json({ ratings: ratingsWithTrainee });
                })
                .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
        } else {
            res.status(StatusCodes.OK).json({ ratings: [] });
        }
    });
};

const readRating = async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const traineeId = req.body.userId;
    const course = (await Course.findById(courseId).then((course) => {
        if (!course) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Course not found"
            });
        }
        return course as ICourse;
    })) as ICourse;
    const courseRatings = course.ratings;
    return await Rating.findOne({ traineeId: traineeId, _id: { $in: courseRatings } })
        .populate("IndividualTrainee", "firstName lastName")
        .populate("CorporateTrainee", "firstName lastName")
        .then((rating) => {
            if (!rating) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "Rating not found"
                });
            }
            const ratingWithTrainee = serializeRating(rating);
            return res.status(StatusCodes.OK).json({ rating: ratingWithTrainee });
        })
        .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
};

const updateRating = async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const traineeId = req.body.userId;

    const course: ICourseModel = (await Course.findById(courseId).then((course) => {
        if (!course) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Course not found"
            });
        }
        return course;
    })) as ICourseModel;

    // validate traineeId
    if (req.body.traineeId) {
        const traineeId = req.body.traineeId;
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

    Rating.findOne({ traineeId: traineeId, _id: { $in: course.ratings } })
        .then((rating) => {
            if (rating) {
                rating.set({
                    rating: req.body.rating,
                    comment: req.body.comment
                });

                return rating
                    .save()
                    .then(async (rating) => {
                        await course.save();
                        res.status(StatusCodes.OK).json({ rating });
                    })
                    .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "not found" });
            }
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const deleteRating = async (req: Request, res: Response) => {
    const ratingId = req.params.ratingId as unknown as mongoose.Types.ObjectId;
    const courseId = req.params.courseId;
    const traineeId = req.body.userId as unknown as mongoose.Types.ObjectId;

    const course: ICourse = (await Course.findById(courseId).then((course) => {
        if (!course) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Course not found"
            });
        }
        return course;
    })) as ICourse;

    if (mongoose.Types.ObjectId.isValid(ratingId)) {
        if (!course.ratings.includes(ratingId)) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Rating does not belong to this course"
            });
        } else {
            await Rating.findByIdAndDelete(ratingId)
                .then((rating) => {
                    if (rating) {
                        if (rating.traineeId != traineeId) {
                            res.status(StatusCodes.BAD_REQUEST).json({
                                message: "You are not allowed to delete this rating"
                            });
                        } else {
                            Course.findByIdAndUpdate(courseId, { $pull: { ratings: ratingId } })
                                .then(() => {
                                    res.status(StatusCodes.OK).json({ rating });
                                })
                                .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
                        }
                    } else {
                        return res.status(StatusCodes.NOT_FOUND).json({ message: "not found" });
                    }
                })
                .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
        }
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Invalid ratingId"
        });
    }
};

function serializeRatingTrainee(ratings: IRatingModel[]) {
    return ratings.map((rating) => serializeRating(rating));
}

export const serializeRating = (rating: IRatingModel) => {
    if (rating.IndividualTrainee) {
        return {
            _id: rating._id,
            trainee: rating.IndividualTrainee,
            rating: rating.rating,
            comment: rating.comment,
            createdAt: rating.createdAt
        };
    } else if (rating.CorporateTrainee) {
        return {
            _id: rating._id,
            trainee: rating.CorporateTrainee,
            rating: rating.rating,
            comment: rating.comment,
            createdAt: rating.createdAt
        };
    } else {
        return {
            _id: rating._id,
            rating: rating.rating,
            comment: rating.comment,
            createdAt: rating.createdAt
        };
    }
};

export default {
    createRating,
    listRatings,
    readRating,
    updateRating,
    deleteRating
};
