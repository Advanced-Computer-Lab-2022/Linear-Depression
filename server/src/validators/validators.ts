import Course, { ICourseModel } from "../models/Course";
import { IPromotionModel, PromotionSource } from "../models/Promotion";

const hasConflict = async (promotion: IPromotionModel) => {
    const courses = await Course.find({ _id: { $in: promotion.courses } });
    for (const course of courses) {
        if (course.activePromotion) {
            if (
                course.activePromotion?.source == PromotionSource.Admin &&
                promotion.source === PromotionSource.Instructor
            ) {
                return true;
            }
        }
    }
    return false;
};

const isValidStartDate = (startDate: Date) => {
    return startDate.getTime() >= Date.now();
};

const isValidEndDate = (startDate: Date, endDate: Date) => {
    return endDate.getTime() > startDate.getTime();
};

const isNotFreeCourse = (course: ICourseModel) => {
    return course.price > 0;
};

export const PromotionValidator = {
    validate: async (promotion: IPromotionModel) => {
        if (!isValidStartDate(promotion.startDate)) {
            throw new Error("Start date must be in the future");
        }
        if (!isValidEndDate(promotion.startDate, promotion.endDate)) {
            throw new Error("End date must be after start date");
        }
        if (await hasConflict(promotion)) {
            throw new Error("Promotion conflicts with existing promotion");
        }
        const courses = await Course.find({ _id: { $in: promotion.courses } });
        for (const course of courses) {
            if (!isNotFreeCourse(course)) {
                throw new Error("Free course cannot have promotion");
            }
        }
    }
};
