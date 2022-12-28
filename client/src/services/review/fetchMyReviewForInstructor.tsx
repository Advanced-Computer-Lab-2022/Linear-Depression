import axios from "axios";

import { config } from "@internals/config";
import { ReviewSubmission } from "@internals/types";

const fetchMyReviewForInstructor = (instructorId: string): Promise<ReviewSubmission> => {
    const REVIEW_GET_URL = `${config.API_URL}/instructors/${instructorId}/ratings`;
    return new Promise((resolve, reject) => {
        axios
            .get(REVIEW_GET_URL)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default fetchMyReviewForInstructor;
