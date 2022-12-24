import axios from "axios";

import { config } from "@internals/config";
import { AccessRequest } from "@internals/types";

const fetchMyAccessRequest = (courseId: string): Promise<AccessRequest> => {
    const API_URL = `${config.API_URL}/me/courses/${courseId}/access-requests`;
    return new Promise((resolve, reject) => {
        axios
            .get(API_URL, {
                withCredentials: true
            })
            .then((res) => {
                resolve(res.data.request);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default fetchMyAccessRequest;
