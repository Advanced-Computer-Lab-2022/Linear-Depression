import axios from "axios";

import { config } from "@internals/config";

const fetchCourseReviews = (courseId: string): Promise<any> => {
    const REVIEWS_FETCH_URL = `${config.API_URL}/courses/${courseId}/ratings`;
    return new Promise((resolve, reject) => {
        axios
            .get(REVIEWS_FETCH_URL, { withCredentials: true })
            .then((res) => {
                resolve(res.data.ratings);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default fetchCourseReviews;
