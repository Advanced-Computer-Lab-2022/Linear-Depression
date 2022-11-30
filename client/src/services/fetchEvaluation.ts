import axios from "axios";

import { config } from "@internals/config";
import { Evaluation } from "@internals/types";

const fetchEvaluation = (courseId: string, lessonId: string, exerciseId: string): Promise<Evaluation> => {
    const EVALUATION_FETCH_URL = `${config.API_URL}/courses/${courseId}/lessons/${lessonId}/exercises/${exerciseId}/submissions`;
    return new Promise((resolve, reject) => {
        axios
            .get(EVALUATION_FETCH_URL, { withCredentials: true })
            .then((res) => {
                resolve(res.data.evaluation);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
};

export default fetchEvaluation;
