import mongoose, { Document, Schema } from "mongoose";
import User, { IUser } from "./User";
const options = { discriminatorKey: "kind" };

export interface IInstructor extends IUser {
    courses: Array<mongoose.Types.ObjectId>; // Array of course IDs
}

// inherit from IUserModel
export interface IInstructorModel extends IInstructor, Document {}

const Instructor = User.discriminator(
    "Instructor",
    new Schema(
        {
            courses: [{ type: mongoose.Types.ObjectId, ref: "Course" }]
        },
        options
    )
);

export default Instructor;
