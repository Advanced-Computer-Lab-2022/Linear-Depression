import { useState, useEffect } from "react";

import { GetReport } from "@internals/api";
import { Report } from "@internals/types";

const useFetchReport = (reportId: string) => {
    const [report, setReport] = useState<Report | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        GetReport(reportId)
            .then((res) => {
                setReport(res);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [reportId]);

    return { report, error, loading };
};

export default useFetchReport;
