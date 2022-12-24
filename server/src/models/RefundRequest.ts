import mongoose, { Document } from "mongoose";
import { sendRefundRequestCreationEmail } from "../services/emails/sendRefundRequestCreationEmail";
import Course from "./Course";
import Enrollment from "./Enrollment";
import IndividualTrainee from "./IndividualTrainee";

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
    const refundRequest = this;
    // send email to trainee
    if (!this.isNew) {
        return next();
    }
    IndividualTrainee.findById(this.traineeId).then(async (trainee) => {
        if (!trainee) {
            return;
        }
        await Enrollment.findById(refundRequest.enrollmentId).then((enrollment) => {
            if (!enrollment) {
                return;
            }
            Course.findById(enrollment.courseId).then((course) => {
                if (!course) {
                    return;
                }
                sendRefundRequestCreationEmail(trainee.email, course.title);
            });
        });
    });
});

export default mongoose.model<IRefundRequestModel>("RefundRequest", refundRequestSchema);
