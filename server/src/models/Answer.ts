import mongoose, { Document } from "mongoose";

export interface IAnswer {
    answers: Array<number>;
    exerciseId: mongoose.Types.ObjectId;
    traineeId: mongoose.Types.ObjectId;
}

export interface IAnswerModel extends IAnswer, Document {}

const answerSchema = new mongoose.Schema(
    {
        answers: { type: Array, required: true },
        exerciseId: { type: mongoose.Types.ObjectId, ref: "Exercise", required: true },
        traineeId: { type: mongoose.Types.ObjectId, required: true }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

answerSchema.virtual("IndividualTrainee", {
    ref: "IndividualTrainee",
    localField: "traineeID",
    foreignField: "_id",
    justOne: true
});

answerSchema.virtual("CorporateTrainee", {
    ref: "CorporateTrainee",
    localField: "traineeID",
    foreignField: "_id",
    justOne: true
});

export default mongoose.model<IAnswerModel>("Answer", answerSchema);
