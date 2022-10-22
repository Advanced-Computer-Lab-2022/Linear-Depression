import { faker } from "@faker-js/faker";
import { IInstructor } from "../../../models/Instructor";

export function instructorFactory(): IInstructor {
    return {
        //FIXME: inherit from `UserFactory`
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        userName: faker.internet.userName(),
        passwordHash: faker.internet.password(),
        courses: [] //FIXME: Use `courseFactory`
    };
}
