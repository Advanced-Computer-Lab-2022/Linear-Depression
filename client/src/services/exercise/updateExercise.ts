import axios from "axios";

import { config } from "@internals/config";

const updateExercise = (exercise: {}, courseId: string, lessonId: string, exerciseId: string) => {
    const UPDATE_EXERCISE_URL = `${config.API_URL}/courses/${courseId}/lessons/${lessonId}/exercises/${exerciseId}`;
    return new Promise((resolve, reject) => {
        console.log(exercise);
        axios
            .put(UPDATE_EXERCISE_URL, exercise, { withCredentials: true })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default updateExercise;
