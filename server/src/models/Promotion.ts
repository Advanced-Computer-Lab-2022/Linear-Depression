import mongoose from "mongoose";
import { PromotionValidator } from "../validators/PromotionValidator";
import Course from "./Course";

export enum PromotionStatus {
    UPCOMING = "Upcoming",
    ACTIVE = "Active",
    EXPIRED = "Expired"
}

export enum PromotionSource {
    INSTRUCTOR = "Instructor",
    ADMIN = "Admin"
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
    source: { type: String, required: true, enum: Object.values(PromotionSource) }
});

promotionSchema.virtual("status").get(function (this: IPromotionModel) {
    const now = new Date();

    if (this.startDate > now) {
        return PromotionStatus.UPCOMING;
    }

    if (this.endDate < now) {
        return PromotionStatus.EXPIRED;
    }

    return PromotionStatus.ACTIVE;
});

promotionSchema.pre("save", async function (this: IPromotionModel, next) {
    this.startDate.setHours(0, 0, 0, 0);
    this.endDate.setHours(23, 59, 59, 999);

    try {
        await PromotionValidator.validate(this);

        next();
    } catch (error: any) {
        next(error);
    }
});

promotionSchema.post(["findOneAndDelete"], async function () {
    await Course.updateMany({ activePromotion: this.getFilter() }, { activePromotion: null });
});

export default mongoose.model<IPromotionModel>("Promotion", promotionSchema);
