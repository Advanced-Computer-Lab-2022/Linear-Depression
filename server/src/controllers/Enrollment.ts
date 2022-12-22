import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Enrollment from "../models/Enrollment";

const readEnrollment = (req: Request, res: Response, next: NextFunction) => {
    const { enrollmentId } = req.params;

    const traineeId = req.body.userId;

    return Enrollment.findById(enrollmentId)
        .then((enrollment) => {
            if (enrollment && enrollment.traineeId == traineeId) {
                return res.status(StatusCodes.OK).json({ enrollment });
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "not found" });
            }
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const readMyEnrollments = (req: Request, res: Response, next: NextFunction) => {
    const traineeId = req.body.userId;

    req.query.traineeId = traineeId;

    return Enrollment.find(req.query)
        .then((enrollment) => {
            if (enrollment) {
                return res.status(StatusCodes.OK).json({ enrollment });
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "not found" });
            }
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const updateEnrollment = (req: Request, res: Response, next: NextFunction) => {
    const { enrollmentId } = req.params;

    const traineeId = req.body.userId;

    return Enrollment.findById(enrollmentId)
        .then((enrollment) => {
            if (enrollment && enrollment.traineeId == traineeId) {
                enrollment.set(req.body);

                return enrollment
                    .save()
                    .then((enrollment) => res.status(StatusCodes.CREATED).json({ enrollment }))
                    .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "not found" });
            }
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

export default {
    readEnrollment,
    readMyEnrollments,
    updateEnrollment
};
