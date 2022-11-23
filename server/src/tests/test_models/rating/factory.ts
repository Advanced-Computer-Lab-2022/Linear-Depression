import { faker } from "@faker-js/faker";
import { IRating } from "../../../models/Rating";
import mongoose from "mongoose";

export function ratingFactory(): IRating {
    return {
        comment: faker.lorem.words(),
        rating: faker.datatype.number({
            min: 1,
            max: 5
        }),
        traineeID: new mongoose.Types.ObjectId(faker.database.mongodbObjectId())
    };
}
