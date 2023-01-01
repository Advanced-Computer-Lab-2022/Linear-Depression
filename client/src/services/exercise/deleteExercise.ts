import axios from "axios";

import { config } from "@internals/config";

const deleteCourse = (courseId: string, lessonId: string, exerciseId: string) => {
    const DELETE_EXERCISE_REQUEST_URL = `${config.API_URL}/courses/${courseId}/lessons/${lessonId}/exercises/${exerciseId}`;
    return new Promise((resolve, reject) => {
        axios
            .delete(DELETE_EXERCISE_REQUEST_URL, { withCredentials: true })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default deleteCourse;
