import { faker } from "@faker-js/faker";
import { IAnswer } from "../../../models/Answer";
import mongoose from "mongoose";

export function answerFactory(): IAnswer {
    const answers = [0, 1, 2, 3].map(() => faker.datatype.number({ min: 0, max: 3 }));

    return {
        answers: answers,
        exerciseId: new mongoose.Types.ObjectId(faker.database.mongodbObjectId()),
        traineeId: new mongoose.Types.ObjectId(faker.database.mongodbObjectId())
    };
}
