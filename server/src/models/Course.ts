import mongoose, { Document, Schema } from "mongoose";
import mongoose_fuzzy_searching, { MongoosePluginModel } from "@imranbarbhuiya/mongoose-fuzzy-searching";
import uniqueValidator from "mongoose-unique-validator";
import { validateURL } from "../utils/modelUtilities";

export interface IMCQuestion {
    question: string;
    choices: Array<string>;
    answerIndex?: number;
}

export const questionSchema = new Schema({
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

export interface ILesson {
    title: string;
    exercises: Array<mongoose.Types.ObjectId>;
    totalHours: number;
    video?: {
        videoLink: string;
        description: string;
    };
}

const lessonSchema = new Schema({
    title: { type: String, required: true },
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
courseSchema.plugin(mongoose_fuzzy_searching, {
    fields: [
        {
            name: "title",
            minSize: 3,
            prefixOnly: true
        },
        {
            name: "subject",
            minSize: 3,
            prefixOnly: true
        }
    ]
});

export default mongoose.model<ICourseModel>("Course", courseSchema) as MongoosePluginModel<ICourseModel>;
