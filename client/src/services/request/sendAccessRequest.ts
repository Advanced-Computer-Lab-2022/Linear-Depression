import axios from "axios";

import { config } from "@internals/config";

const sendAccessRequest = (courseId: string) => {
    const SEND_ACCESS_REQUEST_URL = `${config.API_URL}/courses/${courseId}/access-requests`;
    return new Promise((resolve, reject) => {
        axios
            .post(SEND_ACCESS_REQUEST_URL, {}, { withCredentials: true })
            .then((res) => {
                resolve(res.data.evaluation);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default sendAccessRequest;
