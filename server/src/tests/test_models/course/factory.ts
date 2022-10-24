import { faker } from "@faker-js/faker";
import { ICourse, ILesson } from "../../../models/Course";
import mongoose from "mongoose";

const createExercises = (randomLength: Number): ILesson[] => {
    const exercises: ILesson[] = [];
    for (let i = 0; i < randomLength; i++) {
        exercises.push({
            title: faker.lorem.words(),
            exercises: [new mongoose.Types.ObjectId(faker.database.mongodbObjectId())],
            totalHours: faker.datatype.number(),
            video: {
                videoLink: `https://www.youtube.com/watch?v=${faker.datatype.number()}`,
                description: faker.lorem.paragraph()
            }
        });
    }
    return exercises;
};

export function courseFactory(): ICourse {
    return {
        title: faker.lorem.words(),
        description: faker.lorem.paragraph(),
        instructor: new mongoose.Types.ObjectId(faker.database.mongodbObjectId()),
        subject: faker.lorem.words(),
        price: faker.datatype.number({
            min: 0
        }),
        averageRating: faker.datatype.number({
            min: 0,
            max: 5
        }),
        ratings: [new mongoose.Types.ObjectId(faker.database.mongodbObjectId())],
        totalHours: faker.datatype.number(),
        preview: `https://www.youtube.com/watch?v=${faker.datatype.number()}`,
        lessons: createExercises(
            faker.datatype.number({
                min: 1,
                max: 5
            })
        )
    };
}
