import axios from "axios";

import { config } from "@internals/config";

const fetchMyReviewForInstructor = (
    instructorId: string
): Promise<{ instructorComment: string; instructorRating: number }> => {
    const REVIEW_GET_URL = `${config.API_URL}/instructors/${instructorId}/my-rating`;
    return new Promise((resolve, reject) => {
        axios
            .get(REVIEW_GET_URL)
            .then((res) => {
                resolve({
                    instructorComment: res.data.rating.comment,
                    instructorRating: res.data.rating.rating
                });
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default fetchMyReviewForInstructor;
