import { useEffect, useState } from "react";

import { fetchMyReview } from "@internals/services";
import { ReviewSubmission } from "@internals/types";

const useFetchMyReview = (courseId: string) => {
    const [review, setReview] = useState({
        data: null as ReviewSubmission | null,
        loading: true,
        error: null
    });

    useEffect(() => {
        fetchMyReview(courseId)
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

export default useFetchMyReview;
