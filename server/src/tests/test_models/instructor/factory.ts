import { IInstructorModel } from "../../../models/Instructor";
import { userFactory } from "../userFactory";

export function instructorFactory(): IInstructorModel {
    const instructor = userFactory() as IInstructorModel;
    instructor["__t"] = "Instructor";
    instructor.ratings = [];
    instructor.averageRating = 0;
    instructor.biography = "This is a biography";
    instructor.balance = 0;
    return instructor;
}
