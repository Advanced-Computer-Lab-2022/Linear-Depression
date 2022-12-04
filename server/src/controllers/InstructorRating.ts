import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Rating from "../models/Rating";
import Instructor from "../models/Instructor";
import { serializeRating } from "./CourseRating";
import mongoose from "mongoose";
import IndividualTrainee from "../models/IndividualTrainee";
import CorporateTrainee from "../models/CorporateTrainee";

const listRatings = async (req: Request, res: Response) => {
    const instructorId = req.body.userId;
    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: "You are not authorized to view this page"
        });
    }
    const instructorRatingIds = instructor?.ratings;
    const ratings = await Rating.find({ _id: { $in: instructorRatingIds }, comment: { $exists: true } })
        .populate("IndividualTrainee", "firstName lastName")
        .populate("CorporateTrainee", "firstName lastName");
    const ratingsWithTrainee = ratings.map((rating) => serializeRating(rating));
    res.status(StatusCodes.OK).json({ ratings: ratingsWithTrainee });
};

const createRating = async (req: Request, res: Response) => {
    const instructorId = req.params.instructorId;
    const traineeId = req.body.userId;
    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
        res.status(StatusCodes.NOT_FOUND).json({
            message: "You are not authorized to view this page"
        });
    } else {
        if (traineeId) {
            if (!mongoose.Types.ObjectId.isValid(traineeId)) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Invalid traineeId"
                });
            }
            const individualTrainee = await IndividualTrainee.findById(traineeId);
            const corporateTrainee = await CorporateTrainee.findById(traineeId);
            if (!individualTrainee && !corporateTrainee) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Invalid traineeId"
                });
            } else {
                req.body.traineeID = traineeId;
                await Rating.create(req.body)
                    .then((rating) => {
                        instructor?.ratings.push(rating._id);
                        instructor?.save().then(() => {
                            res.status(StatusCodes.CREATED).json({ rating });
                        });
                    })
                    .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
            }
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "traineeId is required"
            });
        }
    }
};

const deleteRating = async (req: Request, res: Response) => {
    const instructorId = req.params.instructorId;
    const ratingId = req.params.ratingId as unknown as mongoose.Types.ObjectId;

    const traineeId = req.body.userId;

    await Instructor.findById(instructorId).then(async (instructor) => {
        if (!instructor) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Instructor not found"
            });
        } else {
            if (mongoose.Types.ObjectId.isValid(ratingId)) {
                if (!instructor.ratings.includes(ratingId)) {
                    res.status(StatusCodes.NOT_FOUND).json({
                        message: "Rating not found"
                    });
                } else {
                    await Rating.findById(ratingId).then(async (rating) => {
                        if (!rating) {
                            res.status(StatusCodes.NOT_FOUND).json({
                                message: "Rating not found"
                            });
                        } else {
                            if (rating.traineeID.toString() !== traineeId) {
                                res.status(StatusCodes.UNAUTHORIZED).json({
                                    message: "You are not authorized to delete this rating"
                                });
                            } else {
                                await Rating.findByIdAndDelete(ratingId).then(async (rating) => {
                                    await Instructor.findByIdAndUpdate(instructorId, {
                                        $pull: { ratings: ratingId }
                                    }).then(() => {
                                        res.status(StatusCodes.OK).json({
                                            rating
                                        });
                                    });
                                });
                            }
                        }
                    });
                }
            }
        }
    });
};

export default {
    listRatings,
    createRating,
    deleteRating
};
