import axios from "axios";

import { config } from "@internals/config";
import { Lesson as ILessonProps } from "@internals/types";

const fetchLessonById = (courseId: string, lessonId: string): Promise<ILessonProps> => {
    const LESSON_FETCH_URL = `${config.API_URL}/courses/${courseId}/lessons/${lessonId}`;
    return new Promise((resolve, reject) => {
        axios
            .get(LESSON_FETCH_URL, { withCredentials: true })
            .then((res) => {
                resolve(res.data.lesson);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default fetchLessonById;
