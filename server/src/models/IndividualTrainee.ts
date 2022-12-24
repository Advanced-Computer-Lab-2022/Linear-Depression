import mongoose, { Document, Schema } from "mongoose";
import { ITrainee, TraineeSchema } from "./Trainee";
import User from "./User";
const options = { discriminatorKey: "kind" };
export interface IIndividualTrainee extends ITrainee {}

export interface IIndividualTraineeModel extends IIndividualTrainee, Document {}
class IndividualTraineeSchema extends TraineeSchema {
    constructor(obj: Object, options: Object) {
        super(obj, options);
        this.add({});
    }
}

const IndividualTrainee: mongoose.Model<IIndividualTraineeModel> = User.discriminator(
    "IndividualTrainee",
    new IndividualTraineeSchema({}, options)
);

export default IndividualTrainee;
