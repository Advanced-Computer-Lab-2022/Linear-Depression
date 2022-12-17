import mongoose, { Document } from "mongoose";

export interface IReportThread {
    reportId: mongoose.Types.ObjectId;
    replies: {
        userId: mongoose.Types.ObjectId;
        message: string;
        createdAt: Date;
    }[];
}

export interface IReportThreadModel extends IReportThread, Document {}

const reportThreadSchema = new mongoose.Schema(
    {
        reportId: { type: mongoose.Types.ObjectId, ref: "Report", required: true },
        replies: [
            {
                userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
                message: { type: String, required: true },
                createdAt: { type: Date, required: true }
            }
        ]
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IReportThreadModel>("ReportThread", reportThreadSchema);
