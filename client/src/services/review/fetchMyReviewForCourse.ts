import axios from "axios";

import { config } from "@internals/config";
import { ReviewSubmission } from "@internals/types";

const fetchMyReviewForCourse = (courseId: string): Promise<ReviewSubmission> => {
    const REVIEW_GET_URL = `${config.API_URL}/courses/${courseId}/ratings`;
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

export default fetchMyReviewForCourse;
