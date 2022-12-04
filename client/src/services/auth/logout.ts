import axios from "axios";

import { config } from "@internals/config";

const logout = () => {
    const LOGOUT_URL = `${config.API_URL}/auth/logout`;

    return new Promise((resolve, reject) => {
        axios
            .post(LOGOUT_URL, {}, { withCredentials: true })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default logout;
