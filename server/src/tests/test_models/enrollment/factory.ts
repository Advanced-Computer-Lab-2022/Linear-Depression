import { faker } from "@faker-js/faker";
import Course from "../../../models/Course";
import { IEnrollment } from "../../../models/Enrollment";
import IndividualTrainee from "../../../models/IndividualTrainee";
import { courseFactory } from "../course/factory";
import { individualTraineeFactory } from "../trainee/factory";
import mongoose from "mongoose";

export async function enrollmentFactory(): Promise<{
    courseId: mongoose.Types.ObjectId;
    traineeId: mongoose.Types.ObjectId;
    lessons: Array<IEnrollment["lessons"]>;
    progress: number;
}> {
    const courseData = courseFactory();
    const course = new Course(courseData);
    await course.save();
    const traineeData = individualTraineeFactory();
    traineeData.courses = [course._id];
    const trainee = new IndividualTrainee(traineeData);
    await trainee.save();

    return {
        courseId: course._id,
        traineeId: trainee._id,
        lessons: [],
        progress: faker.datatype.number({
            min: 0,
            max: 100
        })
    };
}
