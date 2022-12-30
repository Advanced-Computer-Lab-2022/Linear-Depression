import axios from "axios";

import { config } from "@internals/config";

const deleteLesson = (courseId: string, lessonId: string) => {
    const DELETE_LESSON_REQUEST_URL = `${config.API_URL}/courses/${courseId}/lessons/${lessonId}`;
    return new Promise((resolve, reject) => {
        axios
            .delete(DELETE_LESSON_REQUEST_URL, { withCredentials: true })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default deleteLesson;
