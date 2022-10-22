import { faker } from "@faker-js/faker";
import { IMCQuestion } from "../../../models/Course";
import { IExercise } from "../../../models/Exercise";

const createQuestions = (randomLength: Number): IMCQuestion[] => {
    const questions: IMCQuestion[] = [];
    for (let i = 0; i < randomLength; i++) {
        questions.push({
            question: faker.lorem.sentence(),
            choices: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
            answerIndex: faker.datatype.number({
                min: 0,
                max: 3
            })
        });
    }
    return questions;
};

export const exerciseFactory = (): IExercise => {
    return {
        questions: createQuestions(
            faker.datatype.number({
                min: 1,
                max: 5
            })
        )
    };
};
