import mongoose, { Document } from "mongoose";

export interface INote {
    lessonId: mongoose.Types.ObjectId;
    traineeId: mongoose.Types.ObjectId;
    content: string;
}

export interface INoteModel extends INote, Document {}

const noteSchema = new mongoose.Schema({
    lessonId: { type: mongoose.Types.ObjectId, ref: "Lesson", required: true },
    traineeId: { type: mongoose.Types.ObjectId, required: true },
    content: { type: String, required: true }
});

noteSchema.virtual("IndividualTrainee", {
    ref: "IndividualTrainee",
    localField: "traineeId",
    foreignField: "_id",
    justOne: true
});

noteSchema.virtual("CorporateTrainee", {
    ref: "CorporateTrainee",
    localField: "traineeId",
    foreignField: "_id",
    justOne: true
});

export default mongoose.model<INoteModel>("Note", noteSchema);
