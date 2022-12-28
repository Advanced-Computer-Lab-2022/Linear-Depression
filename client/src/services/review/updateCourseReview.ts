import axios from "axios";

import { config } from "@internals/config";

const updateCourseReview = (courseId: string, rating: number, comment: string) => {
    const REVIEW_URL = `${config.API_URL}/courses/${courseId}/my-rating`;
    return new Promise((resolve, reject) => {
        axios
            .put(REVIEW_URL, {
                rating,
                comment
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default updateCourseReview;
