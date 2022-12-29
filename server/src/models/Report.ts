import mongoose, { Document } from "mongoose";

export interface IReport {
    userId: mongoose.Types.ObjectId;
    courseId: mongoose.Types.ObjectId;
    threadId: mongoose.Types.ObjectId;
    type: string;
    subject: string;
    description: string;
    seen: boolean;
    status: string;
}

export interface IReportModel extends IReport, Document {}

export enum ReportType {
    TECHNICAL = "Technical",
    FINANCIAL = "Financial",
    OTHER = "Other"
}

export enum ReportStatus {
    PENDING = "Pending",
    RESOLVED = "Resolved"
}

const reportSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        courseId: { type: mongoose.Types.ObjectId, ref: "Course", required: false }, // TODO: Implement course reports
        threadId: { type: mongoose.Types.ObjectId, ref: "ReportThread", required: true },
        type: { type: String, required: true, trim: true, enum: Object.values(ReportType) },
        subject: { type: String, required: true, trim: true, maxlength: 45 },
        description: { type: String, required: true, trim: true, maxlength: 500 },
        seen: { type: Boolean, required: false, default: false },
        status: {
            type: String,
            required: false,
            trim: true,
            enum: Object.values(ReportStatus),
            default: ReportStatus.PENDING
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IReportModel>("Report", reportSchema);
