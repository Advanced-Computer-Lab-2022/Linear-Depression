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
    for (const lesson of this.lessons) {
        if (lesson.lessonId.toString() === lessonId.toString()) {
            for (const exercise of lesson.exercisesStatus) {
                exercise.isCompleted = exercise.exerciseId.toString() === exerciseId.toString();
            }
        }
    }

    await this.save();
};

enrollmentSchema.pre<IEnrollmentModel>("save", async function (next) {
    const course = await Course.findById(this.courseId).populate("lessons");

    if (this.isNew) {
        if (!course) {
            return next();
        }

        for (const lessonId of course.lessons) {
            const lesson = await Lesson.findById(lessonId).populate("exercises");
            if (lesson) {
                const lessonStatus: ILessonStatus = {
                    lessonId: lesson._id,
                    isVideoWatched: false,
                    exercisesStatus: []
                };

                for (const exerciseId of lesson.exercises) {
                    const exerciseStatus: IExerciseStatus = {
                        exerciseId: exerciseId,
                        isCompleted: false
                    };
                    lessonStatus.exercisesStatus.push(exerciseStatus);
                }

                this.lessons.push(lessonStatus);
            }
        }
    } else {
        let totalElements = this.lessons.length;
        for (const lesson of this.lessons) {
            totalElements += lesson.exercisesStatus.length;
        }

        let totalWatchedVideos = 0;
        let totalCompletedExercises = 0;
        for (const lesson of this.lessons) {
            if (lesson.isVideoWatched) {
                totalWatchedVideos++;
            }

            for (const exercise of lesson.exercisesStatus) {
                if (exercise.isCompleted) {
                    totalCompletedExercises++;
                }
            }
        }

        this.progress = Math.round(((totalWatchedVideos + totalCompletedExercises) / totalElements) * 100);
    }

    next();
});

enrollmentSchema.pre<IEnrollmentModel>("save", async function (next) {
    this.$locals.wasNew = this.isNew; // save the isNew state for the post save hook

    if (!this.isNew) {
        return next();
    }
});

// a hook on the progress, if it's 100 create a certificate
enrollmentSchema.post<IEnrollmentModel>("save", async function (doc, next) {
    if (this.progress !== 100) {
        return next();
    }

    let traineeName = "";
    let email = "";
    const individualTrainee = await IndividualTrainee.findById(this.traineeId).select("firstName lastName email");
    if (individualTrainee) {
        traineeName = individualTrainee.firstName + " " + individualTrainee.lastName;
        email = individualTrainee.email;
    } else {
        const corporateTrainee = await CorporateTrainee.findById(this.traineeId).select("firstName lastName email");

        if (corporateTrainee) {
            traineeName = corporateTrainee.firstName + " " + corporateTrainee.lastName;
            email = corporateTrainee.email;
        }
    }

    const courseTitle = await Course.findById(this.courseId).select("title");
    if (!courseTitle) {
        console.log("course not found");
        return next();
    }

    const filePath = createCertificate(traineeName, courseTitle!.title, new Date().toDateString(), this._id);

    sendCertificateEmail(email, courseTitle!.title, filePath);

    next();
});

// a post save hook to update the course's enrollments count and credit the instructor
enrollmentSchema.post<IEnrollmentModel>("save", async function (doc, next) {
    if (!this.$locals.wasNew) {
        return next();
    }

    try {
        await Course.findByIdAndUpdate(this.courseId, { $inc: { enrollmentsCount: 1 } }).exec();
    } catch (err) {
        console.log("error updating course's enrollments count");
    } finally {
        next();
    }

    const INSTRUCTOR_CREDIT_PERCENTAGE = 0.4;
    const course = (await Course.findById(this.courseId)) as ICourseModel;
    if (!course) {
        console.log("course not found");
        return next();
    }

    IndividualTrainee.findById(this.traineeId).then(async (trainee) => {
        if (!trainee) {
            return next();
        }

        const coursePrice = await getCoursePriceAfterPromotion(course);
        if (coursePrice < 0) {
            return next();
        }
        // credit the instructor if an individual trainee enrolled
        Instructor.findById(course.instructor).then(async (instructor) => {
            if (instructor) {
                const amount = Math.ceil(coursePrice * INSTRUCTOR_CREDIT_PERCENTAGE * 100) / 100;

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
