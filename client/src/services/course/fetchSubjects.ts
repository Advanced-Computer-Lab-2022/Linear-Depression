import axios from "axios";

import { config } from "@internals/config";

const fetchSubjects = (): Promise<never[]> => {
    const API_URL = `${config.API_URL}/courses/subjects`;
    return new Promise((resolve, reject) => {
        axios
            .get(API_URL)
            .then((res) => {
                resolve(res.data.subjects);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default fetchSubjects;
