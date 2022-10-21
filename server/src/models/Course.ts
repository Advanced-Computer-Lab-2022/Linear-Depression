import mongoose, { Document, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface IQuestion {
  question: string;
  choices: Array<[string, string, string, string]>;
  answerIndex?: number;
}

const questionSchema = new Schema({
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

export interface IExcercise {
  questions: Array<IQuestion>;
}

const excerciseSchema = new Schema({
  questions: {
    type: [questionSchema],
    required: true
  }
});

export interface ILesson {
  title: string;
  excercises: Array<IExcercise>;
  totalHours: number;
  video?: {
    videoLink: string;
    description: string;
  };
}

const lessonSchema = new Schema({
  title: { type: String, required: true, unique: true },
  excercises: [excerciseSchema],
  totalHours: { type: Number, required: true },
  video: {
    videoLink: { type: String, required: true },
    description: { type: String, required: true }
  }
});

export interface ICourse {
  title: string;
  description: string;
  instructor: mongoose.Types.ObjectId;
  subject: string;
  price: number;
  rating: number;
  totalHours: number;
  lessons: Array<ILesson>;
}

export interface ICourseModel extends ICourse, Document {}

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: mongoose.Types.ObjectId, required: true },
  subject: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true, min: 0, max: 5, default: 0 },
  totalHours: { type: Number, required: true },
  lessons: [lessonSchema]
});

courseSchema.plugin(uniqueValidator, { message: "is already taken." });

export default mongoose.model<ICourseModel>("Course", courseSchema);
