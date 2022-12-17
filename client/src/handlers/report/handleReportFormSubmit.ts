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
        setLoading(false);
        navigate("/me/reports/");
    } catch (err) {
        setLoading(false);
        alert(err);
    }
};

export default execute;
