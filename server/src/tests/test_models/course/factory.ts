import { faker } from "@faker-js/faker";
import { ICourse } from "../../../models/Course";
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
        preview: faker.internet.url(),
        lessons: [
            {
                title: faker.lorem.words(),
                exercises: [new mongoose.Types.ObjectId(faker.database.mongodbObjectId())],
                totalHours: faker.datatype.number(),
                video: {
                    videoLink: faker.internet.url(),
                    description: faker.lorem.paragraph()
                }
            }
        ]
    };
}
