import { faker } from "@faker-js/faker";
import { IInstructor } from "../../../models/Instructor";
import { userFactory } from "../userFactory";
import mongoose from "mongoose";

export function instructorFactory(): IInstructor {
    const instructor = userFactory() as IInstructor;
    return instructor;
}
