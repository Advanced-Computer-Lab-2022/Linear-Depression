import mongoose, { Document, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { validateURL } from "../utils/modelUtilities";
import Lesson, { ILessonModel } from "./Lesson";

export interface ICourse {
    title: string;
    description: string;
    instructor: mongoose.Types.ObjectId;
    subject: string;
    price: number;
    averageRating: number;
    ratings: Array<mongoose.Types.ObjectId>;
    totalHours: number;
    discount?: number;
    preview: string;
    lessons: Array<mongoose.Types.ObjectId>;
    isFree: boolean;
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
        min: 0,
        max: 5,
        default: 0
    } /* FIXME: calculate average rating - use hook */,
    ratings: [{ type: mongoose.Types.ObjectId, ref: "Rating", default: [] }],
    totalHours: {
        type: Number,
        // calculate total hours from lessons
        default: 10
    },
    discount: { type: Number, min: 0, max: 100, default: 0 },
    preview: {
        type: String,
        validate: {
            validator: validateURL,
            message: "Invalid URL"
        }
    },
    lessons: [{ type: mongoose.Types.ObjectId, ref: "Lesson", default: [] }],
    isFree: {
        type: Boolean,
        default: function (this: ICourseModel) {
            return this.price === 0;
        }
    }
});

courseSchema.plugin(uniqueValidator, { message: "is already taken." });

export default mongoose.model<ICourseModel>("Course", courseSchema);
