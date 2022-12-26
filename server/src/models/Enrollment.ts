import mongoose, { Document } from "mongoose";
import Course, { ICourseModel } from "./Course";
import Lesson from "./Lesson";

import createCertificate from "../services/certificateService";
import IndividualTrainee from "./IndividualTrainee";
import { sendCertificateEmail } from "../services/emails/sendCertificateEmail";
import CorporateTrainee from "./CorporateTrainee";
import Instructor from "./Instructor";
import { sendEnrollmentEmail } from "../services/emails/sendEnrollmentEmail";
import Settlement from "./Settlement";
import { getCoursePriceAfterPromotion } from "../services/CourseServices";

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
    const enrollment = this as IEnrollmentModel;
    if (enrollment.progress !== 100) {
        return next();
    }
    const course_title = await Course.findById(enrollment.courseId).select("title");
    if (!course_title) {
        console.log("course not found");
        return next();
    }

    let trainee_name = "";
    let email = "";
    const individualTrainee = await IndividualTrainee.findById(enrollment.traineeId).select("firstName lastName email");
    if (individualTrainee) {
        trainee_name = individualTrainee.firstName + " " + individualTrainee.lastName;
        email = individualTrainee.email;
    } else {
        const corporateTrainee = await CorporateTrainee.findById(enrollment.traineeId).select(
            "firstName lastName email"
        );
        if (corporateTrainee) {
            trainee_name = corporateTrainee.firstName + " " + corporateTrainee.lastName;
            email = corporateTrainee.email;
        }
    }

    const filePath = createCertificate(trainee_name, course_title!.title, new Date().toDateString(), enrollment._id);

    sendCertificateEmail(email, course_title!.title, filePath);

    next();
});

// hook on create to send email to instructor and credit him
enrollmentSchema.pre<IEnrollmentModel>("save", async function (next) {
    const INSTRUCTOR_CREDIT_PERCENTAGE = 0.4;
    const enrollment = this as IEnrollmentModel;
    if (!this.isNew) {
        return next();
    }
    const course = (await Course.findById(enrollment.courseId)) as ICourseModel;
    if (!course) {
        console.log("course not found");
        return next();
    }
    IndividualTrainee.findById(enrollment.traineeId).then((trainee) => {
        if (!trainee) {
            return next();
        }
        // credit the instructor if an individual trainee enrolled
        Instructor.findById(course.instructor).then(async (instructor) => {
            if (instructor) {
                const amount =
                    Math.ceil((await getCoursePriceAfterPromotion(course)) * INSTRUCTOR_CREDIT_PERCENTAGE * 100) / 100;

                instructor.credit(amount);
                console.log("instructor credited");
                new Settlement({
                    instructorId: instructor._id,
                    courseId: course._id,
                    amount: amount
                }).save();
                sendEnrollmentEmail(instructor.email, course.title);
            }
        });
    });
});

export default mongoose.model<IEnrollmentModel>("Enrollment", enrollmentSchema);
