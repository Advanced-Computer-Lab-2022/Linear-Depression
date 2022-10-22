import mongoose, { Document, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    passwordHash: string;
}
export interface IUserModel extends IUser, Document {}

export class UserSchema extends Schema {
    constructor(obj: Object, options: Object) {
        super(obj, options);
        this.add({
            firstName: { type: String, required: true, trim: true },
            lastName: { type: String, required: true, trim: true },
            email: {
                type: String,
                required: true,
                unique: true,
                match: [/\S+@\S+\.\S+/, "is invalid"], //regexr.com/70m6a
                trim: true,
                lowercase: true
            },
            userName: { type: String, required: true, unique: true, trim: true, lowercase: true },
            passwordHash: { type: String, required: true }
        });
    }
}
const userSchema = new UserSchema({}, {});
userSchema.plugin(uniqueValidator, { message: "is already taken." });
export default mongoose.model<IUserModel>("User", userSchema);