import axios from "axios";

import { config } from "@internals/config";

const addInstructorReview = (instructorId: string, rating: number, comment: string) => {
    const traineeId = "63638d2dfa52a234ba846b39"; //TODO: remove when cookie is implemented
    const REVIEW_POST_URL = `${config.API_URL}/instructors/${instructorId}/ratings`;

    return new Promise((resolve, reject) => {
        axios
            .post(
                REVIEW_POST_URL,
                {
                    rating,
                    comment,
                    traineeId
                },
                { withCredentials: true }
            )
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default addInstructorReview;
