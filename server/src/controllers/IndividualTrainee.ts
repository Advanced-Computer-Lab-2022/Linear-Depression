import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import IndividualTrainee from "../models/IndividualTrainee";

const createIndividualTrainee = (req: Request, res: Response, next: NextFunction) => {
    const individualTrainee = new IndividualTrainee({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });

    return individualTrainee
        .save()
        .then((individualTrainee) => res.status(StatusCodes.CREATED).json({ individualTrainee }))
        .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
};

const listIndividualTrainees = (req: Request, res: Response, next: NextFunction) => {
    return IndividualTrainee.find()
        .populate("courses")
        .then((individualTrainees) => res.status(StatusCodes.OK).json({ individualTrainees }))
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const readIndividualTrainee = (req: Request, res: Response, next: NextFunction) => {
    const individualTraineeId = req.params.individualTraineeId;

    return IndividualTrainee.findById(individualTraineeId)
        .populate("courses")
        .then((individualTrainee) =>
            individualTrainee
                ? res.status(StatusCodes.OK).json({ individualTrainee })
                : res.status(StatusCodes.NOT_FOUND).json({ message: "not found" })
        )
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const updateIndividualTrainee = (req: Request, res: Response, next: NextFunction) => {
    const individualTraineeId = req.params.individualTraineeId;

    return IndividualTrainee.findById(individualTraineeId)
        .then((individualTrainee) => {
            if (individualTrainee) {
                individualTrainee.set(req.body);

                return individualTrainee
                    .save()
                    .then((individualTrainee) => res.status(StatusCodes.CREATED).json({ individualTrainee }))
                    .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "not found" });
            }
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const deleteIndividualTrainee = (req: Request, res: Response, next: NextFunction) => {
    const individualTraineeId = req.params.individualTraineeId;

    return IndividualTrainee.findByIdAndDelete(individualTraineeId)
        .then((individualTrainee) =>
            individualTrainee
                ? res.status(StatusCodes.CREATED).json({ individualTrainee, message: "Deleted" })
                : res.status(StatusCodes.NOT_FOUND).json({ message: "not found" })
        )
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

export default {
    listIndividualTrainees,
    createIndividualTrainee,
    readIndividualTrainee,
    updateIndividualTrainee,
    deleteIndividualTrainee
};
