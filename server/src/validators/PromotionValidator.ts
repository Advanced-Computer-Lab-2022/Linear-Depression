import Promotion, { IPromotionModel, PromotionStatus, PromotionSource } from "../models/Promotion";
import Course from "../models/Course";

const isNotExpired = (promotion: IPromotionModel) => {
    return promotion.status !== PromotionStatus.EXPIRED;
};

const isValidStartDate = (promotion: IPromotionModel) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return promotion.startDate >= today;
};

const isValidEndDate = (promotion: IPromotionModel) => {
    return promotion.endDate > promotion.startDate;
};

const onlyIncludesPaidCourses = async (promotion: IPromotionModel) => {
    const courses = await Course.find({ _id: { $in: promotion.courses } });
    return courses.every((course) => course.price > 0);
};

const noConflictWithAdminPromotion = async (promotion: IPromotionModel) => {
    if (promotion.source === PromotionSource.ADMIN) {
        return true;
    }

    for (const courseId of promotion.courses) {
        const course = await Course.findById(courseId);
        const courseActivePromotion = await Promotion.findById(course?.activePromotion);

        if (courseActivePromotion?.source === PromotionSource.ADMIN) {
            return false;
        }
    }

    return true;
};

export const PromotionValidator = {
    validate: async (promotion: IPromotionModel) => {
        if (!isValidStartDate(promotion)) {
            throw new Error("Promotion start date is invalid");
        }

        if (!isValidEndDate(promotion)) {
            throw new Error("Promotion end date is invalid");
        }

        if (!(await onlyIncludesPaidCourses(promotion))) {
            throw new Error("Promotion can only include paid courses");
        }

        if (!(await noConflictWithAdminPromotion(promotion))) {
            throw new Error("Promotion conflicts with Admin promotion");
        }

        return true;
    }
};
