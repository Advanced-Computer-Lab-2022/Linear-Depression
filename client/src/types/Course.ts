import { Lesson as ILessonProps } from "@internals/types";

interface ICourseProps {
    _id: string;
    title: string;
    description: string;
    instructor: {
        id: string;
        firstName: string;
        lastName: string;
    } | null;
    averageRating: number;
    totalHours: number;
    price: number;
    discount: number;
    currency: string;
    lessons: ILessonProps[];
}

export default ICourseProps;
