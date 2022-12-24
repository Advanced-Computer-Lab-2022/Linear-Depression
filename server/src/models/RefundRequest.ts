import mongoose, { Document } from "mongoose";

export interface IRefundRequest {
    traineeId: mongoose.Types.ObjectId;
    enrollmentId: mongoose.Types.ObjectId;
    status: string;
}

export interface IRefundRequestModel extends IRefundRequest, Document {}

export const refundRequestSchema = new mongoose.Schema({
    traineeId: {
        type: mongoose.Types.ObjectId,
        ref: "IndividualTrainee",
        required: true
    },
    enrollmentId: {
        type: mongoose.Types.ObjectId,
        ref: "Enrollment",
        required: true
    },
    status: { type: String, required: true, trim: true, enum: ["PENDING", "APPROVED", "REJECTED"], default: "PENDING" }
});

refundRequestSchema.pre<IRefundRequestModel>("save", async function (next) {
    next();
});

export default mongoose.model<IRefundRequestModel>("RefundRequest", refundRequestSchema);
