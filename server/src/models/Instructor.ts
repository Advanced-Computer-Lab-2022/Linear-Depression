import mongoose, { Document, Schema } from "mongoose";
import User, { IUser } from "./User";
const options = { discriminatorKey: "kind" };

export interface IInstructor extends IUser {}

// inherit from IUserModel
export interface IInstructorModel extends IInstructor, Document {}

const Instructor = User.discriminator("Instructor", new Schema({}, options));

export default Instructor;
