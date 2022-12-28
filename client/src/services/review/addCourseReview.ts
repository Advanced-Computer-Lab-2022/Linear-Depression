import axios from "axios";

import { config } from "@internals/config";

const addCourseReview = (courseId: string, rating: number, comment: string) => {
    const REVIEW_POST_URL = `${config.API_URL}/courses/${courseId}/ratings`;
    return new Promise((resolve, reject) => {
        axios
            .post(REVIEW_POST_URL, {
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

export default addCourseReview;
