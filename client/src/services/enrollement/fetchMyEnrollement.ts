import axios from "axios";

import { config } from "@internals/config";
import { Enrollement } from "@internals/types";

const fetchMyEnrollement = (courseId: string): Promise<Enrollement> => {
    const API_URL = `${config.API_URL}/me/enrollements`;
    return new Promise((resolve, reject) => {
        axios
            .get(API_URL, {
                withCredentials: true,
                params: {
                    courseId
                }
            })
            .then((res) => {
                resolve(res.data.enrollement[0]);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default fetchMyEnrollement;
