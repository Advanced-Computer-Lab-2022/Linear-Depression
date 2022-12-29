import axios from "axios";

import { config } from "@internals/config";

const fetchMyReviewForCourse = (
    courseId: string
): Promise<{
    courseComment: string;
    courseRating: number;
}> => {
    const REVIEW_GET_URL = `${config.API_URL}/courses/${courseId}/my-rating`;
    return new Promise((resolve, reject) => {
        axios
            .get(REVIEW_GET_URL)
            .then((res) => {
                resolve({ courseComment: res.data.rating.comment, courseRating: res.data.rating.rating });
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default fetchMyReviewForCourse;
