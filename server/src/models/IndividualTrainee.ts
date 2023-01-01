import mongoose, { Document } from "mongoose";
import { ITrainee, TraineeSchema } from "./Trainee";
import User from "./User";
const options = { discriminatorKey: "kind" };
export interface IIndividualTrainee extends ITrainee {
    wallet: number;

    credit(amount: number): void;
    debit(amount: number): Promise<void>;
}

export interface IIndividualTraineeModel extends IIndividualTrainee, Document {}
class IndividualTraineeSchema extends TraineeSchema {
    constructor(obj: Object, options: Object) {
        super(obj, options);
        this.add({
            wallet: { type: Number, default: 0, min: 0 }
        });
        this.methods.credit = function (amount: number) {
            this.wallet += amount;
            this.save();
        };

        this.methods.debit = async function (amount: number) {
            if (this.wallet < amount) {
                throw new Error("Insufficient funds");
            }
            this.wallet -= amount;
            await this.save();
        };
    }
}

const IndividualTrainee: mongoose.Model<IIndividualTraineeModel> = User.discriminator(
    "IndividualTrainee",
    new IndividualTraineeSchema({}, options)
);

export default IndividualTrainee;
