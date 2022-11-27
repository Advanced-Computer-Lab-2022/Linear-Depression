import axios from "axios";
import { config } from "@internals/config";
import { Promotion } from "@internals/types";

const addPromotion = (promotion: Promotion) => {
    const ADD_PROMOTION_URL = `${config.API_URL}/promotions`;
    return new Promise((resolve, reject) => {
        axios
            .post(ADD_PROMOTION_URL, promotion, { withCredentials: true })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default addPromotion;
