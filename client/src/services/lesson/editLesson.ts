import axios from "axios";

import { config } from "@internals/config";

const editLesson = (courseId: string, lessonId: string, lesson: {}) => {
    const EDIT_LESSON_URL = `${config.API_URL}/courses/${courseId}/lessons/${lessonId}`;
    return new Promise((resolve, reject) => {
        axios
            .put(EDIT_LESSON_URL, lesson, { withCredentials: true })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.response.data.error);
            });
    });
};

export default editLesson;
