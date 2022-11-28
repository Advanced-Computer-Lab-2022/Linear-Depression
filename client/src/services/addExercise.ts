import axios from "axios";

import { config } from "@internals/config";

const addExercise = (exercise: {}, courseId: string, lessonId: string) => {
    const ADD_EXERCISE_URL = `${config.API_URL}/courses/${courseId}/lessons/${lessonId}/exercises`;
    return new Promise((resolve, reject) => {
        console.log(exercise);
        axios
            .post(ADD_EXERCISE_URL, exercise, { withCredentials: true })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default addExercise;
