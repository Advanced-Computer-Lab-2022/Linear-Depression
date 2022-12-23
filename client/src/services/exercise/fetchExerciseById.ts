import axios from "axios";

import { config } from "@internals/config";
import { Exercise as IExerciseProps } from "@internals/types";

const fetchExerciseById = (courseId: string, lessonId: string, exerciseId: string): Promise<IExerciseProps> => {
    const EXERCISE_FETCH_URL = `${config.API_URL}/courses/${courseId}/lessons/${lessonId}/exercises/${exerciseId}`;
    return new Promise((resolve, reject) => {
        axios
            .get(EXERCISE_FETCH_URL, { withCredentials: true })
            .then((res) => {
                resolve(res.data.exercise);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default fetchExerciseById;
