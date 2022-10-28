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
    currency: string;
}

export default ICourseProps;
