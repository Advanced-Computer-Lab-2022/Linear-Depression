import mongoose, { Document, Schema } from "mongoose";
import { ITrainee, TraineeSchema } from "./Trainee";
import User from "./User";
const options = { discriminatorKey: "kind" };

export interface ICorporateTrainee extends ITrainee {
    corporate: String;
    status: String;
    expiredAt: Date;
}

// inherit from ITraineeModel
export interface ICorporateTraineeModel extends ICorporateTrainee, Document {}

class CorporateTraineeSchema extends TraineeSchema {
    constructor(obj: Object, options: Object) {
        super(obj, options);
        this.add({
            corporate: { type: String, required: true, trim: true },
            status: { type: String, required: true, enum: ["EXPIRED", "ACTIVE"], default: "ACTIVE" },
            expiredAt: { type: Date, required: true }
        });
    }
}

const CorporateTrainee: mongoose.Model<ICorporateTraineeModel> = User.discriminator(
    "CorporateTrainee",
    new CorporateTraineeSchema({}, options)
);

export default CorporateTrainee;
