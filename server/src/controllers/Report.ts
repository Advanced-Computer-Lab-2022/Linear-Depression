import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import Report from "../models/Report";
import ReportThread from "../models/ReportThread";

const listReportsByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.body.userId;

        const reports = await Report.find({ userId }).populate("threadId", "updatedAt").sort({ createdAt: -1 });

        return res.status(StatusCodes.OK).json({ reports });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

const getReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reportId = req.params.reportId;

        const report = await Report.findById(reportId)
            .populate("userId", "firstName lastName __t")
            .populate("threadId", "replies")
            .populate({
                path: "threadId",
                populate: {
                    path: "replies.userId",
                    select: "firstName lastName __t"
                }
            });

        return res.status(StatusCodes.OK).json({ report });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

const createReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const threadId = new mongoose.Types.ObjectId();

        const report = new Report({
            _id: new mongoose.Types.ObjectId(),
            threadId: threadId,
            ...req.body
        });
        await report.save();

        const reportThread = new ReportThread({
            _id: threadId,
            reportId: report._id,
            replies: []
        });
        await reportThread.save();

        return res.status(StatusCodes.CREATED).json({ report });
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

const addThreadReply = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const report = await Report.findById(req.params.reportId);

        const reply = {
            _id: new mongoose.Types.ObjectId(),
            createdAt: new Date(),
            ...req.body
        };

        const thread = await ReportThread.findByIdAndUpdate(
            report?.threadId,
            { $push: { replies: reply } },
            { new: true, useFindAndModify: false }
        );

        return res.status(StatusCodes.OK).json({ thread });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

export default {
    listReportsByUser,
    getReport,
    createReport,
    addThreadReply
};
