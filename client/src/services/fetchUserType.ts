import { config } from "@internals/config";
import { User } from "@internals/types";
import axios from "axios";

const fetchUserType = (): Promise<User> => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${config.API_URL}/auth/role`, {
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
