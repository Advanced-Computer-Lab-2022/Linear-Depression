import axios from "axios";

import { config } from "@internals/config";
import { User } from "@internals/types";

const fetchUserType = (): Promise<User> => {
    const API_URL = `${config.API_URL}/auth/role`;

    return new Promise((resolve, reject) => {
        axios
            .get(API_URL, {
                withCredentials: true
            })
            .then((res) => {
                resolve(res.data.type);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default fetchUserType;
