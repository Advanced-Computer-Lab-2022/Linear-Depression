import axios from "axios";

import { config } from "@internals/config";

const login = (email: string, password: string): Promise<{ accessToken: string; userType: number }> => {
    const LOGIN_URL = `${config.API_URL}/auth/login`;

    return new Promise((resolve, reject) => {
        axios
            .post(LOGIN_URL, {
                email,
                password
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default login;
