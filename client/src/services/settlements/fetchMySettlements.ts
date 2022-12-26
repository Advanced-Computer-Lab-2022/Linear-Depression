import axios from "axios";

import { config } from "@internals/config";
import { Review } from "@internals/types";

const fetchMySettlements = (): Promise<Review[]> => {
    const SETTLEMENTS_FETCH_URL = `${config.API_URL}/me/settlements`;
    return new Promise((resolve, reject) => {
        axios
            .get(SETTLEMENTS_FETCH_URL)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default fetchMySettlements;
