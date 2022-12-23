import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import Enrollment from "../models/Enrollment";
import IndividualTrainee from "../models/IndividualTrainee";

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

const createEnrollment = async (req: Request, res: Response, _next: NextFunction) => {
    const courseId = req.body.courseId as unknown as mongoose.Types.ObjectId;
    const traineeId = req.body.userId as unknown as mongoose.Types.ObjectId;

    const enrollment = new Enrollment({
        courseId,
        traineeId
    });

    await enrollment.save();

    IndividualTrainee.findById(traineeId).then((trainee) => {
        if (trainee) {
            trainee.enrollments.push(enrollment._id);
            trainee.save();
        } else {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "not found" });
        }
    });

    return res.status(StatusCodes.CREATED).json({ enrollment });
};

export default {
    readEnrollment,
    readMyEnrollments,
    updateEnrollment,
    createEnrollment
};
