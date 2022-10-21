import mongoose, { Document, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}
export interface IUserModel extends IUser, Document {}

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: [/\S+@\S+\.\S+/, "is invalid"] },
  userName: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }
});

UserSchema.plugin(uniqueValidator, { message: "is already taken." });
export default mongoose.model<IUserModel>("User", UserSchema);
