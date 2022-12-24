import axios from "axios";

import { config } from "@internals/config";
import { RegistrationData } from "@internals/types";

const register = (data: RegistrationData): Promise<{ accessToken: string; userType: number }> => {
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
