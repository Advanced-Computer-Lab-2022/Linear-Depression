import { IInstructorModel } from "../../../models/Instructor";
import { userFactory } from "../userFactory";

export function instructorFactory(): IInstructorModel {
    const instructor = userFactory() as IInstructorModel;
    instructor["__t"] = "Instructor";
    return instructor;
}
