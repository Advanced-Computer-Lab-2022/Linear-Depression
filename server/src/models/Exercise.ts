import mongoose, { Document } from "mongoose";

export interface IMCQuestion {
    question: string;
    choices: Array<string>;
    answerIndex?: number;
}

export const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    choices: {
        type: Array<String>,
        required: true,
        validate: {
            validator: (choices: Array<string>) => choices.length === 4,
            message: "Choices must be an array of 4 strings"
        }
    },
    answerIndex: Number
});

export interface IExercise {
    title: string;
    questions: Array<IMCQuestion>;
}

export interface IExerciseModel extends IExercise, Document {}

const exerciseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    questions: {
        type: [questionSchema],
        required: true
    }
});

export default mongoose.model<IExerciseModel>("Exercise", exerciseSchema);
