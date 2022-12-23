import axios from "axios";

import { config } from "@internals/config";

const updateEnrollment = (enrollmentId: string, enrollment: {}) => {
    const UPDATE_ENROLLEMENT_URL = `${config.API_URL}/enrollments/${enrollmentId}`;
    return new Promise((resolve, reject) => {
        axios
            .put(UPDATE_ENROLLEMENT_URL, enrollment, { withCredentials: true })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default updateEnrollment;
