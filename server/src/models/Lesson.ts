import mongoose, { Document } from "mongoose";
import { validateURL } from "../utils/modelUtilities";

export interface ILesson {
    title: string;
    exercises: Array<mongoose.Types.ObjectId>;
    totalHours: number;
    video?: {
        videoLink: string;
        description: string;
    };
}

export interface ILessonModel extends ILesson, Document {}

const lessonSchema = new mongoose.Schema({
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

export default mongoose.model<ILessonModel>("Lesson", lessonSchema);
