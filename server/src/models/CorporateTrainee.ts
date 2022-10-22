import { Document, Schema } from "mongoose";
import { ITrainee, TraineeSchema } from "./Trainee";
import User from "./User";
const options = { discriminatorKey: "kind" };

export interface ICorporateTrainee extends ITrainee {
    corporate: String;
}

// inherit from ITraineeModel
export interface ICorporateTraineeModel extends ITrainee, Document {}

class CorporateTraineeSchema extends TraineeSchema {
    constructor(obj: Object, options: Object) {
        super(obj, options);
        this.add({
            corporate: { type: String, required: true, trim: true }
        });
    }
}

const CorporateTrainee = User.discriminator("CorporateTrainee", new CorporateTraineeSchema({}, options));

export default CorporateTrainee;
