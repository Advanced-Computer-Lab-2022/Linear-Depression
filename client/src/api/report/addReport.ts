import axios from "axios";

import { ENDPOINTS } from "@internals/api";
import { Report, ReportFormProps } from "@internals/types";

const addReport = (report: ReportFormProps): Promise<Report> => {
    return new Promise((resolve, reject) => {
        axios
            .post(ENDPOINTS.addReport.url, report, { withCredentials: true })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default addReport;
