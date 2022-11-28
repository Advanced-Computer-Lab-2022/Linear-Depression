interface IReviewProps {
    _id: string;
    rating: number;
    comment: string;
    trainee: {
        _id: string;
        firstName: string;
        lastName: string;
    };
    createdAt: string;
}

export default IReviewProps;
