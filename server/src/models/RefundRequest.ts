import mongoose, { Document } from "mongoose";
import { sendRefundRequestApprovalEmail } from "../services/emails/refundRequests/sendRefundRequestApprovalEmail";
import { sendRefundRequestCreationEmail } from "../services/emails/refundRequests/sendRefundRequestCreationEmail";
import { sendRefundRequestRejectionEmail } from "../services/emails/refundRequests/sendRefundRequestRejectionEmail";
import Answer from "./Answer";
import Course from "./Course";
import Enrollment from "./Enrollment";
import IndividualTrainee from "./IndividualTrainee";

export interface IRefundRequest {
    traineeId: mongoose.Types.ObjectId;
    enrollmentId: mongoose.Types.ObjectId;
    refundAmount: number;
    status: string;

    approve(): Promise<void>;
    reject(): Promise<void>;
}

export enum RefundRequestStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
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

    status: {
        type: String,
        required: true,
        trim: true,
        enum: Object.values(RefundRequestStatus),
        default: RefundRequestStatus.PENDING
    }
});

refundRequestSchema.methods.approve = async function () {
    if (this.status !== RefundRequestStatus.PENDING) {
        console.log("Refund request is not pending");
        return;
    }
    this.status = RefundRequestStatus.APPROVED;
    IndividualTrainee.findById(this.traineeId).then(async (trainee) => {
        if (!trainee) {
            console.log("Trainee not found");
            return;
        }
        const enrollment = await Enrollment.findById(this.enrollmentId);
        if (!enrollment) {
            console.log("Enrollment not found");
            return;
        }
        for (const lesson of enrollment.lessons) {
            for (const exercise of lesson.exercisesStatus) {
                await Answer.findOneAndDelete({
                    traineeId: this.traineeId,
                    exerciseId: exercise.exerciseId
                });
            }
        }
        trainee.enrollments.splice(trainee.enrollments.indexOf(this.enrollmentId), 1);
        await Enrollment.findByIdAndDelete(this.enrollmentId);
        trainee.credit(this.refundAmount);
        sendRefundRequestApprovalEmail(trainee.email, this.refundAmount);
        const course = await Course.findById(enrollment.courseId);
        if (!course) {
            console.log("Course not found");
            return;
        }
        course.enrollmentsCount--;
        await course.save();
    });
    await this.save();
};

refundRequestSchema.methods.reject = async function () {
    if (this.status !== RefundRequestStatus.PENDING) {
        console.log("Refund request is not pending");
        return;
    }
    this.status = RefundRequestStatus.REJECTED;

    IndividualTrainee.findById(this.traineeId).then(async (trainee) => {
        if (!trainee) {
            console.log("Trainee not found");
            return;
        }
        // send email to trainee to notify that the refund request is rejected
        sendRefundRequestRejectionEmail(trainee.email);
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
