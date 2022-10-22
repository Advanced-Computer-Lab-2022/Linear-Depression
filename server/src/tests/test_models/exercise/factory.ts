import { faker } from "@faker-js/faker";
import { IExercise } from "../../../models/Exercise";

export const exerciseFactory = (): IExercise => {
    return {
        questions: [
            {
                question: faker.lorem.sentence(),
                choices: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
                answerIndex: faker.datatype.number({
                    min: 0,
                    max: 3
                })
            },
            {
                question: faker.lorem.sentence(),
                choices: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
                answerIndex: faker.datatype.number({
                    min: 0,
                    max: 3
                })
            },
            {
                question: faker.lorem.sentence(),
                choices: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
                answerIndex: faker.datatype.number({
                    min: 0,
                    max: 3
                })
            },
            {
                question: faker.lorem.sentence(),
                choices: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
                answerIndex: faker.datatype.number({
                    min: 0,
                    max: 3
                })
            }
        ]
    };
};
