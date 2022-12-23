import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import AccessRequest from "../models/AccessRequest";

const createAccessRequest = async (req: Request, res: Response, next: NextFunction) => {
    const { courseId } = req.params;
    const traineeId = req.body.userId;

    if (!traineeId || !courseId) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Missing traineeId or courseId" });
    }
    const accessRequest = new AccessRequest({
        traineeId,
        courseId
    });

    return accessRequest
        .save()
        .then((request) => {
            return res.status(StatusCodes.CREATED).json({ request });
        })
        .catch((err) => {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err });
        });
};

const readAccessRequest = async (req: Request, res: Response, next: NextFunction) => {
    const { courseId } = req.params;
    const traineeId = req.body.userId;

    if (!traineeId || !courseId) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Missing traineeId or courseId" });
    }

    return AccessRequest.findOne({
        traineeId,
        courseId,
        status: "PENDING"
    })
        .then((request) => {
            if (request) {
                return res.status(StatusCodes.OK).json({ request });
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ error: "Access request not found" });
            }
        })
        .catch((err) => {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err });
        });
};

export default {
    createAccessRequest,
    readAccessRequest
};
