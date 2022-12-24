import mongoose from "mongoose";
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
            return;
        }
    });

    return new Enrollment({
        traineeId: traineeId,
        courseId: courseId
    }).save();
};
