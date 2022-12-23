import axios from "axios";

import { config } from "@internals/config";

const fetchProfile = () => {
    const API_URL = `${config.API_URL}/me/profile`;

    return new Promise((resolve, reject) => {
        axios
            .get(API_URL, {
                withCredentials: true
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default fetchProfile;
