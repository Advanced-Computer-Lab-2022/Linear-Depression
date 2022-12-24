import axios from "axios";

import { config } from "@internals/config";

const handleCheckout = () => {
    const CHECKOUT_URL = `${config.API_URL}/payment/create-checkout-session`;
    axios
        .post(CHECKOUT_URL, {})
        .then((res) => {
            const { url } = res.data;
            window.location.href = url;
        })
        .catch((err) => {
            console.log(err);
        });
};

export default handleCheckout;
