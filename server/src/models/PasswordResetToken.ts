import crypto from "crypto";
import mongoose, { Document, Schema } from "mongoose";

export interface IPasswordResetToken {
    userId: mongoose.Types.ObjectId;
    token: string;
    expiredBy: Date;

    isValid(): boolean;
}

export interface IPasswordResetTokenModel extends IPasswordResetToken, Document {}

const passResetTokenSchema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
        token: { type: String, required: true },
        expiredBy: { type: Date, required: true }
    },
    { timestamps: true }
);

passResetTokenSchema.pre("save", async function (next) {
    if (this.isModified("token")) {
        this.token = crypto.createHash("sha256").update(this.token).digest("hex");
    }

    next();
});

passResetTokenSchema.methods.isValid = function () {
    return this.expiredBy > new Date();
};

export default mongoose.model<IPasswordResetTokenModel>("PasswordResetToken", passResetTokenSchema);
