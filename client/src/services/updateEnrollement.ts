import axios from "axios";

import { config } from "@internals/config";

const updateEnrollement = (enrollementId: string, enrollement: {}) => {
    const UPDATE_ENROLLEMENT_URL = `${config.API_URL}/enrollements/${enrollementId}`;
    return new Promise((resolve, reject) => {
        axios
            .put(UPDATE_ENROLLEMENT_URL, enrollement, { withCredentials: true })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default updateEnrollement;
