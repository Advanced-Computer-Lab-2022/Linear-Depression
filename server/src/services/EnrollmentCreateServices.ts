import mongoose from "mongoose";
import Course, { CourseStatus } from "../models/Course";
import Enrollment from "../models/Enrollment";

export const createEnrollmentService = async (
    traineeId: mongoose.Types.ObjectId,
    courseId: mongoose.Types.ObjectId
) => {
    Enrollment.findOne({
        traineeId: traineeId,
        courseId: courseId
    }).then((enrollment) => {
        if (enrollment) {
            throw new Error("Enrollment already exists");
        }
    });
    const course = await Course.findById(courseId);
    if (course!.status !== CourseStatus.PUBLISHED) {
        throw new Error("Course is not published");
    }
    return new Enrollment({
        traineeId: traineeId,
        courseId: courseId
    }).save();
};
