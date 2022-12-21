import { NavigateFunction } from "react-router-dom";

import { AddReport } from "@internals/api";
import { ReportFormProps } from "@internals/types";

const execute = async (
    report: ReportFormProps,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    navigate: NavigateFunction
) => {
    setLoading(true);

    try {
        await AddReport(report);
        navigate("/me/reports/");
    } catch (err) {
        alert(err);
    } finally {
        setLoading(false);
    }
};

export default execute;
