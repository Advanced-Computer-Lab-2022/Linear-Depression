import mongoose, { Document, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import mongoose_fuzzy_searching, { MongoosePluginModel } from "@imranbarbhuiya/mongoose-fuzzy-searching";
import bcrypt from "bcrypt";

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    passwordHash: string;
    __t: string;

    isCorrectPassword(passwordHash: string): boolean;
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
userSchema.plugin(mongoose_fuzzy_searching, {
    fields: [
        {
            name: "firstName",
            minSize: 3,
            prefixOnly: true
        },
        {
            name: "lastName",
            minSize: 3,
            prefixOnly: true
        }
    ]
});

userSchema.pre("save", function (next) {
    if (this.isModified("passwordHash")) {
        this.passwordHash = bcrypt.hashSync(this.passwordHash, 10);
    }

    next();
});

userSchema.methods.isCorrectPassword = function (passwordHash: string): boolean {
    return bcrypt.compareSync(passwordHash, this.passwordHash);
};

export default mongoose.model<IUserModel>("User", userSchema) as MongoosePluginModel<IUserModel>;
