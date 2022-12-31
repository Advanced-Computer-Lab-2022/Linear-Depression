import axios from "axios";

import { config } from "@internals/config";

const deleteCourse = (courseId: string) => {
    const DELETE_COURSE_REQUEST_URL = `${config.API_URL}/courses/${courseId}`;
    return new Promise((resolve, reject) => {
        axios
            .delete(DELETE_COURSE_REQUEST_URL, { withCredentials: true })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default deleteCourse;
