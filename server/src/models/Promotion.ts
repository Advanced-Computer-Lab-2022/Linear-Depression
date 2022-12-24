import mongoose from "mongoose";

export enum PromotionStatus {
    Upcoming = "Upcoming",
    Active = "Active",
    Expired = "Expired"
}

export interface IPromotion {
    name: string;
    courses: Array<mongoose.Types.ObjectId>;
    startDate: Date;
    endDate: Date;
    discountPercent: number;
    status: PromotionStatus;
}

export interface IPromotionModel extends IPromotion, mongoose.Document {}

const promotionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    courses: [{ type: mongoose.Types.ObjectId, ref: "Course", default: [] }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    discountPercent: { type: Number, required: true, min: 0, max: 100 }
});

promotionSchema.virtual("status").get(function (this: IPromotionModel) {
    const now = new Date();
    if (this.startDate > now) {
        return PromotionStatus.Upcoming;
    } else if (this.endDate < now) {
        return PromotionStatus.Expired;
    } else {
        return PromotionStatus.Active;
    }
});

export default mongoose.model<IPromotionModel>("Promotion", promotionSchema);
