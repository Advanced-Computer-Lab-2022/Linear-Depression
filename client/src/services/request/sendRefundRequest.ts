import axios from "axios";

import { config } from "@internals/config";

const sendRefundRequest = (enrollmentId: string) => {
    const SEND_REFUND_REQUEST_URL = `${config.API_URL}/me/enrollments/${enrollmentId}/refunds`;
    return new Promise((resolve, reject) => {
        axios
            .post(SEND_REFUND_REQUEST_URL, {}, { withCredentials: true })
            .then((res) => {
                resolve(res.data.refundRequest);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default sendRefundRequest;
