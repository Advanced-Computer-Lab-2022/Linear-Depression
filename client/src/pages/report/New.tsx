import React from "react";

import { ReportPageContainer, NewReportPageHeader, NewReportForm } from "@internals/components";

const NewReport: React.FC = () => {
    return (
        <ReportPageContainer width={800} loading={false}>
            <NewReportPageHeader />

            <NewReportForm />
        </ReportPageContainer>
    );
};

export default NewReport;
