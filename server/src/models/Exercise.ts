import mongoose, { Document } from "mongoose";
import { IMCQuestion, questionSchema } from "./Course";

export interface IExercise {
    questions: Array<IMCQuestion>;
}

export interface IExerciseModel extends IExercise, Document {}

const exerciseSchema = new mongoose.Schema({
    questions: {
        type: [questionSchema],
        required: true
    }
});

export default mongoose.model<IExerciseModel>("Exercise", exerciseSchema);
