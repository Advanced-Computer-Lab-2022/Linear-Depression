import axios from "axios";

import { config } from "@internals/config";

const handleCheckout = (courseId: string) => {
    const CHECKOUT_URL = `${config.API_URL}/payment/checkout-session`;
    axios
        .post(CHECKOUT_URL, {
            courseId
        })
        .then((res) => {
            const { url } = res.data;
            window.location.href = url;
        })
        .catch((err) => {
            console.log(err);
        });
};

export default handleCheckout;
