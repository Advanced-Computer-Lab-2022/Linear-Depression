import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import Enrollment from "../models/Enrollment";
import RefundRequest from "../models/RefundRequest";
import Course from "../models/Course";

const createRefundRequest = async (req: Request, res: Response, _next: NextFunction) => {
    const traineeId = req.body.userId as unknown as mongoose.Types.ObjectId;
    const enrollmentId = req.params.enrollmentId as unknown as mongoose.Types.ObjectId;

    if (!traineeId || !enrollmentId) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Missing required fields" });
    }

    RefundRequest.findOne({ traineeId, enrollmentId }).then((refundRequest) => {
        if (refundRequest) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Refund request already exists" });
        }
        // make sure enrollment exists and progress is less than 50%
        Enrollment.findById(enrollmentId).then((enrollment) => {
            if (!enrollment) {
                return res.status(StatusCodes.BAD_REQUEST).json({ message: "You are not enrolled on this course" });
            }
            if (enrollment.progress >= 0.5) {
                return res
                    .status(StatusCodes.BAD_REQUEST)
                    .json({ message: "You cannot request a refund after 50% of the course has been completed" });
            }
            const refundAmount = Course.findById(enrollment.courseId).then((course) => {
                return course!.price;
            });
            new RefundRequest({
                traineeId,
                enrollmentId,
                status: "PENDING",
                refundAmount
            })
                .save()
                .then((refundRequest) => {
                    return res.status(StatusCodes.CREATED).json({ refundRequest });
                })
                .catch((err) => {
                    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
                });
        });
    });
};

const readRefundRequest = async (req: Request, res: Response, next: NextFunction) => {
    const traineeId = req.body.userId as unknown as mongoose.Types.ObjectId;
    const enrollmentId = req.params.enrollmentId as unknown as mongoose.Types.ObjectId;

    if (!traineeId || !enrollmentId) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Missing required fields" });
    }

    RefundRequest.findOne({ traineeId, enrollmentId, status: "PENDING" })
        .then((refundRequest) => {
            if (!refundRequest) {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "Refund request not found" });
            }

            return res.status(StatusCodes.OK).json({ refundRequest });
        })
        .catch((err) => {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
        });
};

const deleteRefundRequest = async (req: Request, res: Response, next: NextFunction) => {
    const traineeId = req.body.userId as unknown as mongoose.Types.ObjectId;
    const enrollmentId = req.params.enrollmentId as unknown as mongoose.Types.ObjectId;

    if (!traineeId || !enrollmentId) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Missing required fields" });
    }

    RefundRequest.findOneAndDelete({ traineeId, enrollmentId, status: "PENDING" })
        .then((refundRequest) => {
            if (!refundRequest) {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "Refund request not found" });
            }

            return res.status(StatusCodes.OK).json({ refundRequest });
        })
        .catch((err) => {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
        });
};

export default {
    createRefundRequest,
    readRefundRequest,
    deleteRefundRequest
};
