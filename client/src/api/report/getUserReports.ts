import axios from "axios";

import { ENDPOINTS } from "@internals/api";
import { Report } from "@internals/types";

const getUserReports = (): Promise<Report[]> => {
    return new Promise((resolve, reject) => {
        axios
            .get(ENDPOINTS.getUserReports.url, { withCredentials: true })
            .then((res) => {
                res.data.reports.forEach((report: any) => {
                    report.thread = report.threadId;
                    delete report.threadId;
                });

                resolve(res.data.reports);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default getUserReports;
