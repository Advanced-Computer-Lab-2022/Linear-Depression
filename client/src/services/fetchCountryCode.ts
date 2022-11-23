import { config } from "@internals/config";
import { StatusCodes } from "http-status-codes";
import axios from "axios";

const fetchCountryCode = (): Promise<string> => {
    const COUNTRY_URL = `${config.API_URL}/country`;
    return new Promise((resolve, reject) => {
        axios
            .get(COUNTRY_URL, { withCredentials: true })
            .then((res) => {
                if (res.status === StatusCodes.OK) {
                    resolve(res.data.language);
                } else {
                    resolve("");
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default fetchCountryCode;
