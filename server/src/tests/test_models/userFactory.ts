import { IUser } from "../../models/User";
import { faker } from "@faker-js/faker";

export function userFactory(): IUser {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        userName: faker.internet.userName(),
        passwordHash: faker.internet.password(),
        __t: "User",
        isCorrectPassword(passwordHash: string): boolean {
            return passwordHash === this.passwordHash;
        }
    };
}
