import { faker } from "@faker-js/faker";
import { ITrainee } from "../../../models/Trainee";
import { IIndividualTrainee } from "../../../models/IndividualTrainee";
import { ICorporateTrainee } from "../../../models/CorporateTrainee";
import { userFactory } from "../userFactory";

export function traineeFactory(): ITrainee {
    const trainee = userFactory() as ITrainee;
    trainee["courses"] = [];
    trainee["gender"] = faker.name.sex().toLowerCase();
    return trainee;
}

export function individualTraineeFactory(): IIndividualTrainee {
    const IndividualTrainee = traineeFactory() as IIndividualTrainee;
    return IndividualTrainee;
}

export function corporateTraineeFactory(): ICorporateTrainee {
    const CorporateTrainee = traineeFactory() as ICorporateTrainee;
    CorporateTrainee["corporate"] = faker.company.name();
    CorporateTrainee["expiredAt"] = faker.date.future(2);
    return CorporateTrainee;
}
