import { ListDivider } from "@mui/joy";
import React from "react";

import {
    ReportPageHeader,
    ReportPageContainer,
    ReportsTableContainer,
    ReportsTableHeader,
    ReportsTableBodyContainer,
    ReportsTableRow
} from "@internals/components";
import { useFetchReports } from "@internals/hooks";

const AllReports: React.FC = () => {
    const { reports, loading } = useFetchReports();

    return (
        <ReportPageContainer width={1200} loading={loading}>
            <ReportPageHeader />

            <ReportsTableContainer>
                <ReportsTableHeader />

                <ReportsTableBodyContainer>
                    {reports.map((report) => (
                        <React.Fragment key={report._id}>
                            <ReportsTableRow
                                reportId={report._id}
                                subject={report.subject}
                                createdAt={report.createdAt}
                                lastActivity={report.thread.updatedAt || report.updatedAt}
                                status={report.status}
                            />

                            {reports.indexOf(report) !== reports.length - 1 && <ListDivider inset="gutter" />}
                        </React.Fragment>
                    ))}
                </ReportsTableBodyContainer>
            </ReportsTableContainer>
        </ReportPageContainer>
    );
};

export default AllReports;
