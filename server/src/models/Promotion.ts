import mongoose from "mongoose";

export interface IPromotion {
    name: string;
    courses: Array<mongoose.Types.ObjectId>;
    startDate: Date;
    endDate: Date;
    discountPercent: number;
}

export interface IPromotionModel extends IPromotion, mongoose.Document {}

const promotionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    courses: [{ type: mongoose.Types.ObjectId, ref: "Course", default: [] }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    discountPercent: { type: Number, required: true, min: 0, max: 100 }
});

export default mongoose.model<IPromotionModel>("Promotion", promotionSchema);
