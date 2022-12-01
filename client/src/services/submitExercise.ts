import axios from "axios";

import { config } from "@internals/config";
import { Evaluation } from "@internals/types";

const submitExercise = (
    courseId: string,
    lessonId: string,
    exerciseId: string,
    answers: number[]
): Promise<Evaluation> => {
    const SUBMIT_EXERCISE_URL = `${config.API_URL}/courses/${courseId}/lessons/${lessonId}/exercises/${exerciseId}/submissions`;
    return new Promise((resolve, reject) => {
        axios
            .post(SUBMIT_EXERCISE_URL, { answers }, { withCredentials: true })
            .then((res) => {
                resolve(res.data.evaluation);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default submitExercise;
