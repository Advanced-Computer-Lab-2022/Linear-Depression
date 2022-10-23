import { faker } from "@faker-js/faker";
import { ITrainee } from "../../../models/Trainee";
import { IIndividualTrainee } from "../../../models/IndividualTrainee";
import { ICorporateTrainee } from "../../../models/CorporateTrainee";
import { userFactory } from "../userFactory";

export function traineeFactory(): ITrainee {
    const gender = ["male", "female"];
    const trainee = userFactory() as ITrainee;
    trainee["courses"] = [];
    trainee["gender"] = gender[faker.datatype.number({ min: 0, max: 1 })];
    return trainee;
}

export function individualTraineeFactory(): IIndividualTrainee {
    const IndividualTrainee = traineeFactory() as IIndividualTrainee;
    return IndividualTrainee;
}

export function corporateTraineeFactory(): ICorporateTrainee {
    const corporates = ["google", "facebook", "microsoft"];
    const CorporateTrainee = traineeFactory() as ICorporateTrainee;
    CorporateTrainee["corporate"] = corporates[faker.datatype.number({ min: 0, max: 2 })];
    return CorporateTrainee;
}
