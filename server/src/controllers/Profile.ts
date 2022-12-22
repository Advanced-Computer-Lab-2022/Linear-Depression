import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserType } from "../enums/UserTypes";
import CorporateTrainee from "../models/CorporateTrainee";
import IndividualTrainee from "../models/IndividualTrainee";
import Instructor from "../models/Instructor";

const readProfile = async (req: Request, res: Response, _next: NextFunction) => {
    const { userType, userId } = req.body;

    if (userType === UserType.INSTRUCTOR) {
        const instructor = await Instructor.findById(userId);

        if (!instructor) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error: "Instructor not found"
            });
        }

        return res.status(StatusCodes.OK).json({
            instructor
        });
    } else if (userType === UserType.INDIVIDUAL_TRAINEE) {
        const individualTrainee = await IndividualTrainee.findById(userId);

        if (!individualTrainee) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error: "Individual trainee not found"
            });
        }

        return res.status(StatusCodes.OK).json({
            individualTrainee
        });
    } else if (userType === UserType.CORPORATE_TRAINEE) {
        const corporateTrainee = await CorporateTrainee.findById(userId);

        if (!corporateTrainee) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error: "Corporate trainee not found"
            });
        }

        return res.status(StatusCodes.OK).json({
            corporateTrainee
        });
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: "Invalid user type"
        });
    }
};

const updateProfile = async (req: Request, res: Response, _next: NextFunction) => {
    const { userType, userId } = req.body;

    if (userType === UserType.INSTRUCTOR) {
        return Instructor.findById(userId)
            .then((instructor) => {
                if (!instructor) {
                    return res.status(StatusCodes.NOT_FOUND).json({
                        error: "Instructor not found"
                    });
                }

                instructor.set(req.body);
                return instructor
                    .save()
                    .then(() => {
                        return res.status(StatusCodes.OK).json({
                            instructor
                        });
                    })
                    .catch((error) => {
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                            error: error.message
                        });
                    });
            })
            .catch((error) => {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    error: error.message
                });
            });
    } else if (userType === UserType.INDIVIDUAL_TRAINEE) {
        return IndividualTrainee.findById(userId)
            .then((individualTrainee) => {
                if (!individualTrainee) {
                    return res.status(StatusCodes.NOT_FOUND).json({
                        error: "Individual trainee not found"
                    });
                }

                individualTrainee.set(req.body);
                return individualTrainee
                    .save()
                    .then(() => {
                        return res.status(StatusCodes.OK).json({
                            individualTrainee
                        });
                    })
                    .catch((error) => {
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                            error: error.message
                        });
                    });
            })
            .catch((error) => {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    error: error.message
                });
            });
    } else if (userType === UserType.CORPORATE_TRAINEE) {
        return CorporateTrainee.findById(userId)
            .then((corporateTrainee) => {
                if (!corporateTrainee) {
                    return res.status(StatusCodes.NOT_FOUND).json({
                        error: "Corporate trainee not found"
                    });
                }

                corporateTrainee.set(req.body);
                return corporateTrainee
                    .save()
                    .then(() => {
                        return res.status(StatusCodes.OK).json({
                            corporateTrainee
                        });
                    })
                    .catch((error) => {
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                            error: error.message
                        });
                    });
            })
            .catch((error) => {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    error: error.message
                });
            });
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: "Invalid user type"
        });
    }
};

export default {
    readProfile,
    updateProfile
};
