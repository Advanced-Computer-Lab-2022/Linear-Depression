import mongoose, { Document, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface IMCQuestion {
  question: string;
  choices: Array<[string, string, string, string]>;
  answerIndex?: number;
}

const QuestionSchema = new Schema({
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
  questions: Array<IMCQuestion>;
}

const ExcerciseSchema = new Schema({
  questions: {
    type: [QuestionSchema],
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

const LessonSchema = new Schema({
  title: { type: String, required: true, unique: true },
  excercises: [ExcerciseSchema],
  totalHours: { type: Number, required: true },
  video: {
    videoLink: { type: String, required: true },
    description: { type: String, required: true }
  }
});

export interface IRating {
  comment: string;
  rating: number;
  traineedID: {
    type: Schema.Types.ObjectId;
    ref: "Trainee";
  };
}

const RatingSchema = new Schema({
  comment: { type: String },
  rating: { type: Number, required: true },
  traineedID: {
    type: Schema.Types.ObjectId,
    ref: "Trainee"
  }
});

export interface ICourse {
  title: string;
  description: string;
  instructor: mongoose.Types.ObjectId;
  subject: string;
  price: number;
  averageRating: number;
  ratings: Array<IRating>;
  totalHours: number;
  lessons: Array<ILesson>;
}

export interface ICourseModel extends ICourse, Document {}

const CourseSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  instructor: { type: mongoose.Types.ObjectId, ref: "Instructor", required: true },
  subject: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  averageRating: { type: Number, required: true, min: 0, max: 5, default: 0 } /* calculate average rating */,
  ratings: [RatingSchema],
  totalHours: { type: Number, required: true },
  lessons: [LessonSchema]
});

CourseSchema.plugin(uniqueValidator, { message: "is already taken." });

export default mongoose.model<ICourseModel>("Course", CourseSchema);
