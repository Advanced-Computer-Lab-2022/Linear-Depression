import { useEffect, useState } from "react";

import { fetchMyReviewForCourse, fetchMyReviewForInstructor } from "@internals/services";
import { ReviewSubmission } from "@internals/types";

const useFetchMyReviewSubmission = (courseId: string, instructorId: string) => {
    const initialReviewSubmission: ReviewSubmission = {
        courseComment: "",
        courseRating: 0,
        instructorComment: "",
        instructorRating: 0
    };

    const [review, setReview] = useState(initialReviewSubmission);
    const [isNewReview, setIsNewReview] = useState(false);

    useEffect(() => {
        const promise1 = fetchMyReviewForCourse(courseId);
        const promise2 = fetchMyReviewForInstructor(instructorId);

        Promise.all([promise1, promise2])
            .then((values) => {
                setReview({ ...review, ...values[0], ...values[1] });
                setIsNewReview(true);
            })
            .catch(() => {
                setReview(initialReviewSubmission);
                setIsNewReview(false);
            });
    }, []);

    return { review, setReview, isNewReview };
};

export default useFetchMyReviewSubmission;
