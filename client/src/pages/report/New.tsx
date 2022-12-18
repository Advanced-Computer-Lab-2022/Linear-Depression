import React from "react";

import { ReportPageContainer, NewReportForm, ReportPageHeader } from "@internals/components";

const NewReport: React.FC = () => {
    return (
        <ReportPageContainer width={1000} loading={false}>
            <ReportPageHeader newReport={true} />

            <NewReportForm />
        </ReportPageContainer>
    );
};

export default NewReport;
