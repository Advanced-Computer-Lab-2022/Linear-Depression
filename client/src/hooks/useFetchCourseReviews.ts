import { useEffect, useState } from "react";

import { fetchCourseReviews } from "@internals/services";

const refactorData = (reviews: any) => {
    const data = reviews.map((review: any) => {
        return {
            _id: review._id,
            rating: review.rating,
            comment: review.comment,
            trainee: {
                _id: review.CorporateTrainee ? review.CorporateTrainee._id : review.IndividualTrainee._id,
                firstName: review.CorporateTrainee
                    ? review.CorporateTrainee.firstName
                    : review.IndividualTrainee.firstName,
                lastName: review.CorporateTrainee ? review.CorporateTrainee.lastName : review.IndividualTrainee.lastName
            },
            createdAt: "2020-10-10"
        };
    });

    return data;
};

const useFetchCourseReview = (courseId: string) => {
    const [reviews, setReviews] = useState({
        data: [],
        loading: true,
        error: null
    });

    useEffect(() => {
        fetchCourseReviews(courseId)
            .then((data) => {
                setReviews({
                    data: refactorData(data),
                    loading: false,
                    error: null
                });
            })
            .catch((error) => {
                setReviews({
                    data: [],
                    loading: false,
                    error: error
                });
            });
    });

    return { reviews, setReviews };
};

export default useFetchCourseReview;
