import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Enrollement from "../models/Enrollement";

const readEnrollement = (req: Request, res: Response, next: NextFunction) => {
    const { enrollementId } = req.params;

    const traineeId = req.body.userId;

    return Enrollement.findById(enrollementId)
        .then((enrollement) => {
            if (enrollement && enrollement.traineeId == traineeId) {
                return res.status(StatusCodes.OK).json({ enrollement });
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "not found" });
            }
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const readMyEnrollements = (req: Request, res: Response, next: NextFunction) => {
    const traineeId = req.body.userId;

    req.query.traineeId = traineeId;

    return Enrollement.find(req.query)
        .then((enrollement) => {
            if (enrollement) {
                return res.status(StatusCodes.OK).json({ enrollement });
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "not found" });
            }
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const updateEnrollement = (req: Request, res: Response, next: NextFunction) => {
    const { enrollementId } = req.params;

    const traineeId = req.body.userId;

    return Enrollement.findById(enrollementId)
        .then((enrollement) => {
            if (enrollement && enrollement.traineeId == traineeId) {
                enrollement.set(req.body);

                return enrollement
                    .save()
                    .then((enrollement) => res.status(StatusCodes.CREATED).json({ enrollement }))
                    .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "not found" });
            }
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

export default {
    readEnrollement,
    readMyEnrollements,
    updateEnrollement
};
