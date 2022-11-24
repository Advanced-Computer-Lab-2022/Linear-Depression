import { faker } from "@faker-js/faker";
import { IAnswer } from "../../../models/Answer";
import mongoose from "mongoose";

export function answerFactory(): IAnswer {
    return {
        answers: [faker.datatype.number(), faker.datatype.number(), faker.datatype.number(), faker.datatype.number()],
        exerciseId: new mongoose.Types.ObjectId(faker.database.mongodbObjectId()),
        traineeId: new mongoose.Types.ObjectId(faker.database.mongodbObjectId())
    };
}
