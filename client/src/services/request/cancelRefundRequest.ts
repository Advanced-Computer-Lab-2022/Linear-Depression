import axios from "axios";

import { config } from "@internals/config";

const cancelRefundRequest = (enrollmentId: string) => {
    const CANCEL_REFUND_REQUEST_URL = `${config.API_URL}/me/enrollments/${enrollmentId}/refunds`;
    return new Promise((resolve, reject) => {
        axios
            .delete(CANCEL_REFUND_REQUEST_URL, { withCredentials: true })
            .then((res) => {
                resolve(res.data.refundRequest);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default cancelRefundRequest;
