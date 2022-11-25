import { faker } from "@faker-js/faker";
import { ILesson } from "../../../models/Lesson";
import mongoose from "mongoose";

const createExercises = (randomLength: Number): mongoose.Types.ObjectId[] => {
    const exercises: mongoose.Types.ObjectId[] = [];
    for (let i = 0; i < randomLength; i++) {
        exercises.push(new mongoose.Types.ObjectId());
    }
    return exercises;
};

export function lessonFactory(): ILesson {
    return {
        title: faker.lorem.words(),
        exercises: createExercises(
            faker.datatype.number({
                min: 1,
                max: 5
            })
        ),
        totalHours: faker.datatype.number()
    };
}
