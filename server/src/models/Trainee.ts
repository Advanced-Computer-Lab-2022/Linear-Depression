import mongoose, { Document } from "mongoose";
import { IUser, UserSchema } from "./User";

export interface ITrainee extends IUser {
    courses: Array<mongoose.Types.ObjectId>;
    enrollments: Array<mongoose.Types.ObjectId>;
    gender: string;
    wallet: number;
}

export interface ITraineeModel extends ITrainee, Document {}

export class TraineeSchema extends UserSchema {
    constructor(obj: Object, options: Object) {
        super(obj, options);
        this.add({
            courses: [{ type: mongoose.Types.ObjectId, ref: "Course" }],
            enrollments: [{ type: mongoose.Types.ObjectId, ref: "Enrollment" }],
            gender: { type: String, required: true, trim: true, enum: ["male", "female"] },
            wallet: { type: Number, default: 0 }
        }),
            {
                toJSON: {
                    virtuals: true
                }
            };
        this.methods.credit = function (amount: number) {
            this.wallet += amount;
            this.save();
        };

        this.methods.debit = function (amount: number) {
            if (this.wallet < amount) {
                throw new Error("Insufficient funds");
            }
            this.wallet -= amount;
            this.save();
        };
    }
}
