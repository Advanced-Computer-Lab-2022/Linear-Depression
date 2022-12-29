import axios from "axios";

import { config } from "@internals/config";

const enrollOnCourse = (courseId: string) => {
    const ENROLL_ON_COURSE_URL = `${config.API_URL}/me/enrollments`;
    return new Promise((resolve, reject) => {
        axios
            .post(ENROLL_ON_COURSE_URL, {
                courseId
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default enrollOnCourse;
