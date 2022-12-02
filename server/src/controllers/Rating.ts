import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import Rating, { IRatingModel } from "../models/Rating";
import CorporateTrainee from "../models/CorporateTrainee";
import IndividualTrainee from "../models/IndividualTrainee";
import Course, { ICourse } from "../models/Course";

const createRating = async (req: Request, res: Response) => {
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
    // if there's existing rating for this trainee and course, return error
    const existingRatings = (await Course.find({ courseId }).populate({
        path: "ratings",
        match: { traineeID: req.body.traineeID }
    })) as ICourse[];
    for (const course of existingRatings) {
        if (course.ratings.length > 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Rating already exists for this trainee and course"
            });
        }
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
    return await Rating.findById(ratingId)
        .populate("IndividualTrainee", "firstName lastName")
        .populate("CorporateTrainee", "firstName lastName")
        .then((rating) => {
            if (!rating) {
                res.status(StatusCodes.NOT_FOUND).json({
                    message: "Rating not found"
                });
            } else {
                if (!course.ratings.includes(ratingId)) {
                    res.status(StatusCodes.BAD_REQUEST).json({
                        message: "Rating does not belong to this course"
                    });
                }
                if (rating.IndividualTrainee) {
                    res.status(StatusCodes.OK).json({
                        rating: {
                            _id: rating._id,
                            trainee: rating.IndividualTrainee,
                            rating: rating.rating,
                            comment: rating.comment,
                            createdAt: rating.createdAt
                        }
                    });
                } else if (rating.CorporateTrainee) {
                    res.status(StatusCodes.OK).json({
                        rating: {
                            _id: rating._id,
                            trainee: rating.CorporateTrainee,
                            rating: rating.rating,
                            comment: rating.comment,
                            createdAt: rating.createdAt
                        }
                    });
                } else {
                    res.status(StatusCodes.OK).json({
                        rating: {
                            _id: rating._id,
                            rating: rating.rating,
                            comment: rating.comment,
                            createdAt: rating.createdAt
                        }
                    });
                }
            }
        })
        .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
};

const updateRating = async (req: Request, res: Response) => {
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

const deleteRating = async (req: Request, res: Response) => {
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

    if (mongoose.Types.ObjectId.isValid(ratingId)) {
        if (!course.ratings.includes(ratingId)) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Rating does not belong to this course"
            });
        } else {
            await Rating.findByIdAndDelete(ratingId)
                .then((rating) => {
                    if (rating) {
                        Course.findByIdAndUpdate(courseId, { $pull: { ratings: ratingId } })
                            .then(() => {
                                res.status(StatusCodes.OK).json({ rating });
                            })
                            .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
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

export default {
    createRating,
    listRatings,
    readRating,
    updateRating,
    deleteRating
};
function serializeRatingTrainee(ratings: IRatingModel[]) {
    return ratings.map((rating: IRatingModel) => {
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
    });
}
