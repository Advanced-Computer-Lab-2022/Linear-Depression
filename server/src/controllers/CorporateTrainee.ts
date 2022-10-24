import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import CorporateTrainee from "../models/CorporateTrainee";

const createCorporateTrainee = (req: Request, res: Response, next: NextFunction) => {
    const corporateTrainee = new CorporateTrainee({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });

    return corporateTrainee
        .save()
        .then((corporateTrainee) => res.status(StatusCodes.CREATED).json({ corporateTrainee }))
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const listCorporateTrainees = (req: Request, res: Response, next: NextFunction) => {
    return CorporateTrainee.find()
        .populate("courses")
        .then((corporateTrainees) => res.status(StatusCodes.OK).json({ corporateTrainees }))
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const readCorporateTrainee = (req: Request, res: Response, next: NextFunction) => {
    const corporateTraineeId = req.params.corporateTraineeId;

    return CorporateTrainee.findById(corporateTraineeId)
        .populate("courses")
        .then((corporateTrainee) =>
            corporateTrainee
                ? res.status(StatusCodes.OK).json({ corporateTrainee })
                : res.status(StatusCodes.NOT_FOUND).json({ message: "not found" })
        )
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const updateCorporateTrainee = (req: Request, res: Response, next: NextFunction) => {
    const corporateTraineeId = req.params.corporateTraineeId;

    return CorporateTrainee.findById(corporateTraineeId)
        .then((corporateTrainee) => {
            if (corporateTrainee) {
                corporateTrainee.set(req.body);

                return corporateTrainee
                    .save()
                    .then((corporateTrainee) => res.status(StatusCodes.CREATED).json({ corporateTrainee }))
                    .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "not found" });
            }
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const deleteCorporateTrainee = (req: Request, res: Response, next: NextFunction) => {
    const corporateTraineeId = req.params.corporateTraineeId;

    return CorporateTrainee.findByIdAndDelete(corporateTraineeId)
        .then((corporateTrainee) =>
            corporateTrainee
                ? res.status(StatusCodes.CREATED).json({ corporateTrainee, message: "Deleted" })
                : res.status(StatusCodes.NOT_FOUND).json({ message: "not found" })
        )
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

export default {
    listCorporateTrainees,
    createCorporateTrainee,
    readCorporateTrainee,
    updateCorporateTrainee,
    deleteCorporateTrainee
};
