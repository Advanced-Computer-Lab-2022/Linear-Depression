import { faker } from "@faker-js/faker";
import { IAnswer } from "../../../models/Answer";
import { exerciseFactory } from "../exercise/factory";
import { traineeFactory } from "../trainee/factory";
import Exercise from "../../../models/Exercise";
import IndividualTrainee from "../../../models/IndividualTrainee";

export async function answerFactory(): Promise<IAnswer> {
    const answers = [0, 1, 2, 3].map(() => faker.datatype.number({ min: 0, max: 3 }));

    const exercise = new Exercise(exerciseFactory());
    await exercise.save();

    const trainee = new IndividualTrainee(traineeFactory());
    await trainee.save();

    return {
        answers: answers,
        exerciseId: exercise._id,
        traineeId: trainee._id
    };
}
