import axios from "axios";

import { ENDPOINTS } from "@internals/api";
import { Report } from "@internals/types";

const getReport = (reportId: string): Promise<Report> => {
    return new Promise((resolve, reject) => {
        axios
            .get(ENDPOINTS.getReport(reportId).url, { withCredentials: true })
            .then((res) => {
                res.data.report.thread = res.data.report.threadId;
                delete res.data.report.threadId;

                res.data.report.user = res.data.report.userId;
                delete res.data.report.userId;

                res.data.report.user.type = res.data.report.user.__t;
                delete res.data.report.user.__t;

                res.data.report.thread.replies.forEach((reply: any) => {
                    reply.user = reply.userId;
                    delete reply.userId;

                    reply.user.type = reply.user.__t;
                    delete reply.user.__t;
                });

                resolve(res.data.report);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default getReport;
