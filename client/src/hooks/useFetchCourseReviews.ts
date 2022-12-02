import { useEffect, useState } from "react";

import { fetchCourseReviews } from "@internals/services";

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
                    data: data,
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
