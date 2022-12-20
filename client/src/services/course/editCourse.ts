import axios from "axios";

import { config } from "@internals/config";

const editCourse = (courseId: string, course: {}) => {
    const EDIT_COURSE_URL = `${config.API_URL}/courses/${courseId}`;
    return new Promise((resolve, reject) => {
        axios
            .put(EDIT_COURSE_URL, course, { withCredentials: true })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default editCourse;
