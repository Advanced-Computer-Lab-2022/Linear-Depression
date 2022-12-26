import mongoose from "mongoose";

export interface ISettlement {
    instructorId: mongoose.Types.ObjectId;
    courseId: mongoose.Types.ObjectId;
    amount: number;
    createdAt: Date;
}

export interface ISettlementModel extends ISettlement, mongoose.Document {}

const settlementSchema = new mongoose.Schema(
    {
        instructorId: { type: mongoose.Types.ObjectId, ref: "Instructor", required: true },
        courseId: { type: mongoose.Types.ObjectId, ref: "Course", required: true },
        amount: { type: Number, required: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ISettlementModel>("Settlement", settlementSchema);
