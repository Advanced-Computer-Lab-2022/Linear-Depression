import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import Rating from "../models/Rating";
import CorporateTrainee from "../models/CorporateTrainee";
import IndividualTrainee from "../models/IndividualTrainee";

const createRating = async (req: Request, res: Response, next: NextFunction) => {
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
    const rating = new Rating({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });

    return rating
        .save()
        .then((rating) => res.status(StatusCodes.CREATED).json({ rating }))
        .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
};

const listRatings = (req: Request, res: Response, next: NextFunction) => {
    // filter only ratings that are have comments
    return Rating.find({ comment: { $exists: true } })
        .then((ratings) => res.status(StatusCodes.OK).json({ ratings }))
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const readRating = (req: Request, res: Response, next: NextFunction) => {
    const ratingId = req.params.ratingId;

    return Rating.findById(ratingId)
        .then((rating) =>
            rating
                ? res.status(StatusCodes.OK).json({ rating })
                : res.status(StatusCodes.NOT_FOUND).json({ message: "not found" })
        )
        .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
};

const updateRating = (req: Request, res: Response, next: NextFunction) => {
    const ratingId = req.params.ratingId;

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

    return Rating.findByIdAndDelete(ratingId)
        .then((rating) =>
            rating
                ? res.status(StatusCodes.OK).json({ rating })
                : res.status(StatusCodes.NOT_FOUND).json({ message: "not found" })
        )
        .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
};

export default {
    createRating,
    listRatings,
    readRating,
    updateRating,
    deleteRating
};
