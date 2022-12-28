import axios from "axios";

import { config } from "@internals/config";
import { RefundRequest } from "@internals/types";

const fetchMyRefundRequest = (enrollmentId: string): Promise<RefundRequest> => {
    const API_URL = `${config.API_URL}/me/enrollments/${enrollmentId}/refunds`;
    return new Promise((resolve, reject) => {
        axios
            .get(API_URL, {
                withCredentials: true
            })
            .then((res) => {
                resolve(res.data.refundRequest);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default fetchMyRefundRequest;
