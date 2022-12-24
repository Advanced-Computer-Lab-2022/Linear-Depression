import mongoose, { Document } from "mongoose";
import Rating, { IRatingModel } from "./Rating";
import User, { IUser, UserSchema } from "./User";
const options = { discriminatorKey: "kind" };

export interface IInstructor extends IUser {
    ratings: Array<mongoose.Types.ObjectId>;
    averageRating: number;
    biography: string;
    balance: number;
}

export interface IInstructorModel extends IInstructor, Document {}

class InstructorSchema extends UserSchema {
    constructor(obj: Object, options: Object) {
        super(obj, options);
        this.add({
            ratings: [{ type: mongoose.Types.ObjectId, ref: "Rating", default: [] }],
            averageRating: {
                type: Number,
                min: 0,
                max: 5,
                default: 0
            },
            biography: { type: String, required: false, trim: true },
            balance: { type: Number, default: 0 }
        });
        this.pre("save", async function (next) {
            const instructor = this as IInstructorModel;
            const ratingIds = instructor.ratings as Array<mongoose.Types.ObjectId>;
            const ratings = (await Rating.find({ _id: { $in: ratingIds } })) as Array<IRatingModel>;
            const totalRating = ratings.reduce((acc, rating) => acc + rating.rating, 0);
            if (ratings.length > 0) {
                instructor.averageRating = totalRating / ratings.length;
            } else {
                instructor.averageRating = 0;
            }
            next();
        });

        this.methods.credit = function (amount: number) {
            this.balance += amount;
            this.save();
        };
    }
}

const Instructor: mongoose.Model<IInstructorModel> = User.discriminator(
    "Instructor",
    new InstructorSchema({}, options)
);

export default Instructor<IInstructorModel>;
