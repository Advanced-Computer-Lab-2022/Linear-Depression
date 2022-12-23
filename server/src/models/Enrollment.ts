import mongoose, { Document } from "mongoose";
import Course from "./Course";
import Lesson from "./Lesson";

import createCertificate from "../services/certificateService";
import IndividualTrainee from "./IndividualTrainee";

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

export interface IEnrollment {
    courseId: mongoose.Types.ObjectId;
    traineeId: mongoose.Types.ObjectId;
    lessons: Array<ILessonStatus>;
    progress: number;

    setCompletedExercise(lessonId: mongoose.Types.ObjectId, exerciseId: mongoose.Types.ObjectId): void;
}

export interface IEnrollmentModel extends IEnrollment, Document {}

const enrollmentSchema = new mongoose.Schema({
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

enrollmentSchema.pre<IEnrollmentModel>("save", async function (next) {
    const enrollment = this as IEnrollmentModel;
    const courseId = enrollment.courseId;
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
                    enrollment.lessons.push(lessonStatus);
                }
            }
        }
    } else {
        let totalElements = enrollment.lessons.length;
        for (const lesson of enrollment.lessons) {
            totalElements += lesson.exercisesStatus.length;
        }
        let totalWatchedVideos = 0;
        let totalCompletedExercises = 0;
        for (const lesson of enrollment.lessons) {
            if (lesson.isVideoWatched) {
                totalWatchedVideos++;
            }
            for (const exercise of lesson.exercisesStatus) {
                if (exercise.isCompleted) {
                    totalCompletedExercises++;
                }
            }
        }
        enrollment.progress = Math.round(((totalWatchedVideos + totalCompletedExercises) / totalElements) * 100);
    }
    next();
});

enrollmentSchema.virtual("IndividualTrainee", {
    ref: "IndividualTrainee",
    localField: "traineeId",
    foreignField: "_id",
    justOne: true
});

enrollmentSchema.virtual("CorporateTrainee", {
    ref: "CorporateTrainee",
    localField: "traineeId",
    foreignField: "_id",
    justOne: true
});

enrollmentSchema.methods.setCompletedExercise = async function (
    lessonId: mongoose.Types.ObjectId,
    exerciseId: mongoose.Types.ObjectId
) {
    const enrollment = this as IEnrollmentModel;
    for (const lesson of enrollment.lessons) {
        if (lesson.lessonId.toString() === lessonId.toString()) {
            for (const exercise of lesson.exercisesStatus) {
                if (exercise.exerciseId.toString() === exerciseId.toString()) {
                    exercise.isCompleted = true;
                }
            }
        }
    }
    await enrollment.save();
};

// a hook on the progress, if it's 100 create a certificate
enrollmentSchema.post<IEnrollmentModel>("save", async function (doc, next) {
    console.log("post save hook");
    // get the enrollment and populate the course and trainee
    const enrollment = this as IEnrollmentModel;
    const course_title = await Course.findById(enrollment.courseId).select("title");
    if (!course_title) {
        console.log("course not found");
        next();
    }
    // get the trainee check if it's individual or corporate
    let trainee_name = "";
    const individualTrainee = await IndividualTrainee.findById(enrollment.traineeId).select("firstName lastName");
    if (individualTrainee) {
        trainee_name = individualTrainee.firstName + " " + individualTrainee.lastName;
    } else {
        const corporateTrainee = await IndividualTrainee.findById(enrollment.traineeId).select("firstName lastName");
        if (corporateTrainee) {
            trainee_name = corporateTrainee.firstName + " " + corporateTrainee.lastName;
        }
    }
    createCertificate(trainee_name, course_title!.title, new Date().toDateString(), enrollment._id);
    next();
});

export default mongoose.model<IEnrollmentModel>("Enrollment", enrollmentSchema);
