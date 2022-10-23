import { faker } from "@faker-js/faker";
import { IInstructor, IInstructorModel } from "../../../models/Instructor";
import { userFactory } from "../userFactory";
import mongoose from "mongoose";

export function instructorFactory(): IInstructorModel {
    const instructor = userFactory() as IInstructorModel;
    return instructor;
}
