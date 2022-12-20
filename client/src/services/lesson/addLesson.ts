import axios from "axios";

import { config } from "@internals/config";

const addLesson = (courseId: string, lesson: {}) => {
    const ADD_LESSON_URL = `${config.API_URL}/courses/${courseId}/lessons`;
    return new Promise((resolve, reject) => {
        axios
            .post(ADD_LESSON_URL, lesson, { withCredentials: true })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default addLesson;
