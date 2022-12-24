import mongoose, { Document } from "mongoose";
import { isValidVideoLink } from "../services/videoServices";

export interface ILesson {
    title: string;
    exercises: Array<mongoose.Types.ObjectId>;
    totalHours: number;
    video?: {
        title: string;
        videoLink: string;
        description: string;
    };
}

export interface ILessonModel extends ILesson, Document {}

const lessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    exercises: [{ type: mongoose.Types.ObjectId, ref: "Exercise", default: [] }],
    totalHours: { type: Number, required: true },
    video: {
        title: { type: String },
        videoLink: {
            type: String,
            validate: {
                validator: isValidVideoLink,
                message: "Invalid URL"
            }
        },
        description: { type: String }
    }
});

export default mongoose.model<ILessonModel>("Lesson", lessonSchema);
