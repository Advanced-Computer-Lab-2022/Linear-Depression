import axios from "axios";

import { User } from "@internals/types";

const login = (
    email: string,
    password: string
): Promise<{
    type: User;
}> => {
    const LOGIN_URL = `/auth/login`;

    return new Promise((resolve, reject) => {
        axios
            .post(
                LOGIN_URL,
                {
                    email,
                    password
                },
                { withCredentials: true } // TODO: not correct
            )
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default login;
