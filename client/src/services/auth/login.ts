import axios from "axios";

// import { config } from "@internals/config";
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
                { withCredentials: true }
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
