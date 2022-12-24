import mongoose, { Document } from "mongoose";
import { IUser, UserSchema } from "./User";

export interface ITrainee extends IUser {
    courses: Array<mongoose.Types.ObjectId>;
    enrollments: Array<mongoose.Types.ObjectId>;
    gender: string;
}

export interface ITraineeModel extends ITrainee, Document {}

export class TraineeSchema extends UserSchema {
    constructor(obj: Object, options: Object) {
        super(obj, options);
        this.add({
            courses: [{ type: mongoose.Types.ObjectId, ref: "Course" }],
            enrollments: [{ type: mongoose.Types.ObjectId, ref: "Enrollment" }],
            gender: { type: String, required: true, trim: true, enum: ["male", "female"] }
        }),
            {
                toJSON: {
                    virtuals: true
                }
            };
    }
}
