import { useEffect, useState } from "react";

import { fetchCourseReviews } from "@internals/services";
import { Review } from "@internals/types";

const useFetchCourseReview = (courseId: string) => {
    const [reviews, setReviews] = useState({
        data: null as Review[] | null,
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
    }, []);

    return { reviews, setReviews };
};

export default useFetchCourseReview;
