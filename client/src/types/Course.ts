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
    activePromotion: {
        name: string;
        discountPercent: number;
        startDate: Date;
        endDate: Date;
    } | null;
    currency: string;
}

export default ICourseProps;
