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
    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: "You are not authorized to view this page"
        });
    }

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
    await Rating.create(req.body)
        .then((rating) => {
            instructor?.ratings.push(rating._id);
            instructor?.save();
            res.status(StatusCodes.CREATED).json({ rating });
        })
        .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
};

export default {
    listRatings,
    createRating
};
