import mongoose from "mongoose";

export enum PromotionStatus {
    Upcoming = "Upcoming",
    Active = "Active",
    Expired = "Expired"
}

export enum PromotionSource {
    Instructor = "Instructor",
    Admin = "Admin"
}

export interface IPromotion {
    name: string;
    courses: Array<mongoose.Types.ObjectId>;
    startDate: Date;
    endDate: Date;
    discountPercent: number;
    status: PromotionStatus;
    source: PromotionSource;
}

export interface IPromotionModel extends IPromotion, mongoose.Document {}

const promotionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    courses: [{ type: mongoose.Types.ObjectId, ref: "Course", default: [] }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    discountPercent: { type: Number, required: true, min: 0, max: 100 },
    source: {
        type: String,
        enum: Object.values(PromotionSource),
        default: PromotionSource.Admin
    }
});

promotionSchema.virtual("status").get(function (this: IPromotionModel) {
    const now = new Date();
    if (this.startDate > now) {
        return PromotionStatus.Upcoming;
    }
    const endOfDay = new Date(this.endDate);
    endOfDay.setHours(23, 59, 59, 999);
    if (endOfDay < now) {
        return PromotionStatus.Expired;
    }
    return PromotionStatus.Active;
});

export default mongoose.model<IPromotionModel>("Promotion", promotionSchema);
