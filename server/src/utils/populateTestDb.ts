import Course from "../models/Course";
import Instructor from "../models/Instructor";
import Rating from "../models/Rating";
import CorporateTrainee, { ICorporateTraineeModel } from "../models/CorporateTrainee";
import IndividualTrainee, { IIndividualTraineeModel } from "../models/IndividualTrainee";
import Exercise from "../models/Exercise";
import Lesson from "../models/Lesson";

import { courseFactory } from "../tests/test_models/course/factory";
import { instructorFactory } from "../tests/test_models/instructor/factory";
import { ratingFactory } from "../tests/test_models/rating/factory";
import { corporateTraineeFactory } from "../tests/test_models/trainee/factory";
import { individualTraineeFactory } from "../tests/test_models/trainee/factory";
import { exerciseFactory } from "../tests/test_models/exercise/factory";
import { lessonFactory } from "../tests/test_models/course/factory";
import { Types } from "mongoose";

export const populateTestDb = async () => {
    const instructorData = instructorFactory();
    const instructor = new Instructor(instructorData);
    for (let i = 0; i < 3; i++) {
        const courseData = courseFactory();
        courseData.instructor = instructor._id;

        let traineeData = undefined;
        if (i % 2 == 0) {
            traineeData = corporateTraineeFactory();
        } else {
            traineeData = individualTraineeFactory();
        }

        const ratingIds = [];
        for (let j = 0; j < 3; j++) {
            const ratingData = ratingFactory();
            const rating = new Rating(ratingData);
            await rating.save();
            ratingIds.push(rating._id);
        }
        courseData.ratings = ratingIds;

        const lessonIds = [];
        for (let j = 0; j < 3; j++) {
            const lessonData = lessonFactory();
            const lesson = new Lesson(lessonData);
            for (let k = 0; k < 3; k++) {
                const exerciseData = exerciseFactory();
                const exercise = new Exercise(exerciseData);
                await exercise.save();
                lesson.exercises.push(exercise._id);
            }
            await lesson.save();
            lessonIds.push(lesson._id);
        }
        courseData.lessons = lessonIds;

        const course = new Course(courseData);
        await course.save();

        traineeData.courses.push(course._id);
        let trainee:
            | (ICorporateTraineeModel & { _id: Types.ObjectId })
            | (IIndividualTraineeModel & { _id: Types.ObjectId })
            | undefined = undefined;
        if (i % 2 == 0) {
            trainee = new CorporateTrainee(traineeData);
        } else {
            trainee = new IndividualTrainee(traineeData);
        }
        await trainee.save();

        ratingIds.forEach(async (ratingId) => {
            const rating = await Rating.findById(ratingId);
            if (rating) {
                if (trainee) {
                    rating.traineeID = trainee._id;
                }
                await rating.save();
            }
        });
    }

    await instructor.save();
};
