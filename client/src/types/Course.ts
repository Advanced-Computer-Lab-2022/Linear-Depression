import CourseStatus from "./enums/CourseStatus";
import { Lesson as ILessonProps, Review as IReviewProps } from "@internals/types";

interface ICourseProps {
    _id: string;
    title: string;
    description: string;
    instructor: {
        _id: string;
        firstName: string;
        lastName: string;
    } | null;
    averageRating: number;
    enrollmentsCount: number;
    totalHours: number;
    price: number;
    activePromotion: {
        name: string;
        discountPercent: number;
        startDate: Date;
        endDate: Date;
    } | null;
    currency: string;
    lessons: ILessonProps[];
    ratings: IReviewProps[];
    preview: string;
    thumbnail: string;
    subject?: string;
    status: CourseStatus;
    isOwner: boolean;
}

export default ICourseProps;
