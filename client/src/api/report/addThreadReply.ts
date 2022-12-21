import axios from "axios";

import { ENDPOINTS } from "@internals/api";
import { ReportThread } from "@internals/types";

const addThreadReply = (reportId: string, message: string): Promise<ReportThread> => {
    return new Promise((resolve, reject) => {
        axios
            .post(ENDPOINTS.addThreadReply(reportId).url, { message }, { withCredentials: true })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default addThreadReply;
