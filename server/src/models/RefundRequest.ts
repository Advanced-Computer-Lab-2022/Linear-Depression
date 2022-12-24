import mongoose, { Document } from "mongoose";
import { sendRefundRequestApprovalEmail } from "../services/emails/sendRefundRequestApprovalEmail";
import { sendRefundRequestCreationEmail } from "../services/emails/sendRefundRequestCreationEmail";
import { sendRefundRequestRejectionEmail } from "../services/emails/sendRefundRequestRejectionEmail";
import Course from "./Course";
import Enrollment from "./Enrollment";
import IndividualTrainee from "./IndividualTrainee";

export interface IRefundRequest {
    traineeId: mongoose.Types.ObjectId;
    enrollmentId: mongoose.Types.ObjectId;
    status: string;
    reason?: string;
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
    refundAmount: {
        type: Number,
        required: true
    },

    reason: {
        type: String,
        required: false
    },

    status: { type: String, required: true, trim: true, enum: ["PENDING", "APPROVED", "REJECTED"], default: "PENDING" }
});

refundRequestSchema.methods.approve = async function () {
    this.status = "APPROVED";
    IndividualTrainee.findById(this.traineeId).then(async (trainee) => {
        if (!trainee) {
            console.log("Trainee not found");
            return;
        }
        trainee.enrollments.splice(trainee.enrollments.indexOf(this.enrollmentId), 1);
        await Enrollment.findByIdAndDelete(this.enrollmentId);
        trainee.credit(this.refundAmount);
        sendRefundRequestApprovalEmail(trainee.email, this.refundAmount);
    });
    await this.save();
};

refundRequestSchema.methods.reject = async function () {
    this.status = "REJECTED";

    IndividualTrainee.findById(this.traineeId).then(async (trainee) => {
        if (!trainee) {
            console.log("Trainee not found");
            return;
        }
        // send email to trainee to notify that the refund request is rejected
        sendRefundRequestRejectionEmail(trainee.email, this.reason);
    });
    await this.save();
};

refundRequestSchema.pre<IRefundRequestModel>("save", async function (next) {
    const refundRequest = this;
    // send email to trainee
    if (!this.isNew) {
        return next();
    }
    IndividualTrainee.findById(this.traineeId).then(async (trainee) => {
        await Enrollment.findById(refundRequest.enrollmentId).then((enrollment) => {
            Course.findById(enrollment!.courseId).then((course) => {
                sendRefundRequestCreationEmail(trainee!.email, course!.title);
            });
        });
    });
});

export default mongoose.model<IRefundRequestModel>("RefundRequest", refundRequestSchema);
