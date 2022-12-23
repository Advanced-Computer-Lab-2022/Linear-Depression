import mongoose, { Document } from "mongoose";

export interface IAccessRequest {
    traineeId: mongoose.Types.ObjectId;
    courseId: mongoose.Types.ObjectId;
    status: string;
}

export interface IAccessRequestModel extends IAccessRequest, Document {}

export const accessRequestSchema = new mongoose.Schema({
    traineeId: {
        type: mongoose.Types.ObjectId,
        ref: "CorporateTrainee",
        required: true
    },
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        required: true
    },
    status: { type: String, required: true, trim: true, enum: ["PENDING", "APPROVED", "REJECTED"], default: "PENDING" }
});

export default mongoose.model<IAccessRequestModel>("AccessRequest", accessRequestSchema);
