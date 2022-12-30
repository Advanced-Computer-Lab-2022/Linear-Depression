import axios from "axios";

import { config } from "@internals/config";

const publish = (courseId: string) => {
    const PUBLISH_COURSE_URL = `${config.API_URL}/courses/${courseId}/publish`;
    return new Promise((resolve, reject) => {
        axios
            .post(PUBLISH_COURSE_URL)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const close = (courseId: string) => {
    const PUBLISH_COURSE_URL = `${config.API_URL}/courses/${courseId}/close`;
    return new Promise((resolve, reject) => {
        axios
            .post(PUBLISH_COURSE_URL)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const open = (courseId: string) => {
    const PUBLISH_COURSE_URL = `${config.API_URL}/courses/${courseId}/open`;
    return new Promise((resolve, reject) => {
        axios
            .post(PUBLISH_COURSE_URL)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export { publish, close, open };
