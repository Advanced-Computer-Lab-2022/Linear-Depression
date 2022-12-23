import axios from "axios";

import { config } from "@internals/config";
import { Enrollment } from "@internals/types";

const fetchMyEnrollment = (courseId: string): Promise<Enrollment> => {
    const API_URL = `${config.API_URL}/me/enrollments`;
    return new Promise((resolve, reject) => {
        axios
            .get(API_URL, {
                withCredentials: true,
                params: {
                    courseId
                }
            })
            .then((res) => {
                resolve(res.data.enrollment[0]);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default fetchMyEnrollment;
