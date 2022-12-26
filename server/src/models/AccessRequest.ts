import mongoose, { Document } from "mongoose";
import { sendAccessRequestApprovalEmail } from "../services/emails/accessRequests/sendAccessRequestApprovalEmail";
import CorporateTrainee from "./CorporateTrainee";
import Course from "./Course";
import { sendAccessRequestRejectionEmail } from "../services/emails/accessRequests/sendAccessRequestRejectionEmail";
import { sendAccessRequestCreationEmail } from "../services/emails/accessRequests/sendAccessRequestCreationEmail";
import { createEnrollmentService } from "../services/EnrollmentCreateServices";

export interface IAccessRequest {
    traineeId: mongoose.Types.ObjectId;
    courseId: mongoose.Types.ObjectId;
    status: string;

    approve(): Promise<void>;
    reject(): Promise<void>;
}

export enum AccessRequestStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
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
    status: {
        type: String,
        required: true,
        trim: true,
        enum: Object.values(AccessRequestStatus),
        default: AccessRequestStatus.PENDING
    }
});

accessRequestSchema.methods.approve = async function () {
    if (this.status !== AccessRequestStatus.PENDING) {
        console.log("Access request is not pending");
        return;
    }
    this.status = AccessRequestStatus.APPROVED;
    CorporateTrainee.findById(this.traineeId).then(async (trainee) => {
        if (!trainee) {
            console.log("Trainee not found");
            return;
        }

        createEnrollmentService(this.traineeId, this.courseId).then((enrollment: { _id: mongoose.Types.ObjectId }) => {
            trainee.enrollments.push(enrollment._id);
            trainee.save();
            Course.findById(this.courseId).then((course) => {
                sendAccessRequestApprovalEmail(trainee.email, course!.title);
            });
        });
    });
    await this.save();
};

accessRequestSchema.methods.reject = async function () {
    if (this.status !== AccessRequestStatus.PENDING) {
        console.log("Access request is not pending");
        return;
    }
    this.status = AccessRequestStatus.REJECTED;

    CorporateTrainee.findById(this.traineeId).then(async (trainee) => {
        if (!trainee) {
            console.log("Trainee not found");
            return;
        }
        Course.findById(this.courseId).then((course) => {
            sendAccessRequestRejectionEmail(trainee.email, course!.title);
        });
    });
    await this.save();
};

accessRequestSchema.pre<IAccessRequestModel>("save", async function (next) {
    const accessRequest = this;
    // send email to trainee
    if (!this.isNew) {
        return next();
    }
    CorporateTrainee.findById(this.traineeId).then(async (trainee) => {
        Course.findById(this.courseId).then((course) => {
            sendAccessRequestCreationEmail(trainee!.email, course!.title);
        });
    });
});

export default mongoose.model<IAccessRequestModel>("AccessRequest", accessRequestSchema);
