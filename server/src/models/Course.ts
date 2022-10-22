import mongoose, { Document, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { validateURL } from "../utils/modelUtilities";

export interface IMCQuestion {
    question: string;
    choices: Array<[string, string, string, string]>;
    answerIndex?: number;
}

export const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    choices: {
        type: Array<[string, string, string, string]>,
        required: true
    },
    answer: Number
});

export interface ILesson {
    title: string;
    excercises: Array<mongoose.Types.ObjectId>;
    totalHours: number;
    video?: {
        videoLink: string;
        description: string;
    };
}

const lessonSchema = new Schema({
    title: { type: String, required: true, unique: true },
    exercises: [{ type: mongoose.Types.ObjectId, ref: "Exercise" }],
    totalHours: { type: Number, required: true },
    video: {
        videoLink: {
            type: String,
            required: true,
            validate: {
                validator: validateURL,
                message: "Invalid URL"
            }
        },
        description: { type: String, required: true }
    }
});

export interface ICourse {
    title: string;
    description: string;
    instructor: mongoose.Types.ObjectId;
    subject: string;
    price: number;
    averageRating: number;
    ratings: Array<mongoose.Types.ObjectId>;
    totalHours: number;
    preview: string;
    lessons: Array<ILesson>;
}

export interface ICourseModel extends ICourse, Document {}

const courseSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    instructor: { type: mongoose.Types.ObjectId, ref: "Instructor", required: true },
    subject: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    averageRating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0
    } /* calculate average rating - use hook */,
    ratings: [{ type: mongoose.Types.ObjectId, ref: "Rating" }],
    totalHours: { type: Number, required: true },
    preview: {
        type: String,
        required: true,
        validate: {
            validator: validateURL,
            message: "Invalid URL"
        }
    },
    lessons: [lessonSchema]
});

courseSchema.plugin(uniqueValidator, { message: "is already taken." });

export default mongoose.model<ICourseModel>("Course", courseSchema);
