import axios from "axios";

import { config } from "@internals/config";

const register = (data: {
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    passwordHash: string;
    gender: string;
}): Promise<{ accessToken: string; userType: number }> => {
    const REGISTER_URL = `${config.API_URL}/individual-trainees`;

    return new Promise((resolve, reject) => {
        axios
            .post(REGISTER_URL, data)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default register;
