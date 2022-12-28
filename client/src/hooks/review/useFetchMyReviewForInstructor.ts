import { useEffect, useState } from "react";

import { fetchMyReviewForInstructor } from "@internals/services";
import { ReviewSubmission } from "@internals/types";

const useFetchMyReviewForInstructor = (courseId: string) => {
    const [review, setReview] = useState({
        data: null as ReviewSubmission | null,
        loading: true,
        error: null
    });

    useEffect(() => {
        fetchMyReviewForInstructor(courseId)
            .then((data) => {
                setReview({
                    data: data,
                    loading: false,
                    error: null
                });
            })
            .catch((error) => {
                setReview({
                    data: null,
                    loading: false,
                    error: error
                });
            });
    }, []);

    return { review };
};

export default useFetchMyReviewForInstructor;
