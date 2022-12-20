import mongoose, { Document } from "mongoose";
import Course from "./Course";
import Lesson from "./Lesson";

interface IExerciseStatus {
    exerciseId: mongoose.Types.ObjectId;
    isCompleted: boolean;
}

export const exerciseStatusSchema = new mongoose.Schema({
    exerciseId: {
        type: mongoose.Types.ObjectId,
        ref: "Exercise",
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
});

interface ILessonStatus {
    lessonId: string;
    isVideoWatched: boolean;
    exercisesStatus: Array<IExerciseStatus>;
}

export const lessonStatusSchema = new mongoose.Schema({
    lessonId: {
        type: mongoose.Types.ObjectId,
        ref: "Lesson",
        required: true
    },
    isVideoWatched: {
        type: Boolean,
        default: false
    },
    exercisesStatus: [
        {
            type: exerciseStatusSchema,
            required: true,
            default: []
        }
    ]
});

export interface IEnrollement {
    courseId: string;
    traineeId: string;
    lessons: Array<ILessonStatus>;
    progress: number;

    setCompletedExercise(lessonId: string, exerciseId: string): void;
}

export interface IEnrollementModel extends IEnrollement, Document {}

const enrollementSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        required: true
    },
    traineeId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    lessons: [
        {
            type: lessonStatusSchema,
            required: true,
            default: []
        }
    ],
    progress: {
        type: Number,
        default: 0
    }
});

enrollementSchema.pre<IEnrollementModel>("save", async function (next) {
    const enrollement = this as IEnrollementModel;
    const courseId = enrollement.courseId;
    const course = await Course.findById(courseId).populate("lessons");
    if (this.isNew) {
        if (course) {
            const lessons = course.lessons;
            for (const lessonId of lessons) {
                const lesson = await Lesson.findById(lessonId).populate("exercises");
                if (lesson) {
                    const lessonStatus: ILessonStatus = {
                        lessonId: lesson._id,
                        isVideoWatched: false,
                        exercisesStatus: []
                    };
                    const exercises = lesson.exercises;
                    for (const exerciseId of exercises) {
                        const exerciseStatus: IExerciseStatus = {
                            exerciseId: exerciseId,
                            isCompleted: false
                        };
                        lessonStatus.exercisesStatus.push(exerciseStatus);
                    }
                    enrollement.lessons.push(lessonStatus);
                }
            }
        }
    } else {
        let totalElements = enrollement.lessons.length;
        for (const lesson of enrollement.lessons) {
            totalElements += lesson.exercisesStatus.length;
        }
        let totalWatchedVideos = 0;
        let totalCompletedExercises = 0;
        for (const lesson of enrollement.lessons) {
            if (lesson.isVideoWatched) {
                totalWatchedVideos++;
            }
            for (const exercise of lesson.exercisesStatus) {
                if (exercise.isCompleted) {
                    totalCompletedExercises++;
                }
            }
        }
        enrollement.progress = Math.round(((totalWatchedVideos + totalCompletedExercises) / totalElements) * 100);
    }
    next();
});

enrollementSchema.virtual("IndividualTrainee", {
    ref: "IndividualTrainee",
    localField: "traineeId",
    foreignField: "_id",
    justOne: true
});

enrollementSchema.virtual("CorporateTrainee", {
    ref: "CorporateTrainee",
    localField: "traineeId",
    foreignField: "_id",
    justOne: true
});

enrollementSchema.methods.setCompletedExercise = async function (lessonId: string, exerciseId: string) {
    const enrollement = this as IEnrollementModel;
    for (const lesson of enrollement.lessons) {
        if (lesson.lessonId.toString() === lessonId) {
            for (const exercise of lesson.exercisesStatus) {
                if (exercise.exerciseId.toString() === exerciseId) {
                    exercise.isCompleted = true;
                }
            }
        }
    }
    await enrollement.save();
};

export default mongoose.model<IEnrollementModel>("Enrollement", enrollementSchema);
