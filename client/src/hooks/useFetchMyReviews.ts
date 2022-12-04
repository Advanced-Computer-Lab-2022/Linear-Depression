import { useEffect, useState } from "react";

import { fetchMyReviews } from "@internals/services";
import { Review } from "@internals/types";

const useFetchMyReview = () => {
    const [reviews, setReviews] = useState({
        data: null as Review[] | null,
        loading: true,
        error: null
    });

    useEffect(() => {
        fetchMyReviews()
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

export default useFetchMyReview;
