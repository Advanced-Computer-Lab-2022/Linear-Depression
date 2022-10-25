interface ICourseCardProps {
    course?: {
        id: string;
        title: string;
        description: string;
        instructor: string;
        rating: number;
        duration: number;
        price: number;
        currency: string;
    };
}

export default ICourseCardProps;
