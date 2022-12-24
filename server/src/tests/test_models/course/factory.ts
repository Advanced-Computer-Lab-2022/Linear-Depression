import { faker } from "@faker-js/faker";
import { ICourse } from "../../../models/Course";
import { ILesson } from "../../../models/Lesson";
import mongoose from "mongoose";

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
        lessons: [new mongoose.Types.ObjectId(faker.database.mongodbObjectId())],
        isFree: faker.datatype.boolean()
    };
}

export function lessonFactory(): ILesson {
    return {
        title: faker.lorem.words(),
        exercises: [new mongoose.Types.ObjectId(faker.database.mongodbObjectId())],
        totalHours: faker.datatype.number(),
        video: {
            videoLink: `https://www.youtube.com/watch?v=${faker.datatype.number()}`,
            description: faker.lorem.paragraph(),
            title: faker.lorem.words()
        }
    };
}
