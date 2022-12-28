import React from "react";
import { useSearchParams } from "react-router-dom";

import { ReportPageContainer, NewReportForm, ReportPageHeader } from "@internals/components";
import { useFetchCourseById } from "@internals/hooks";
import { useAppSelector } from "@internals/redux";

const NewReport: React.FC = () => {
    const [searchParams] = useSearchParams();
    const courseId = searchParams.get("course_id") as string;

    useFetchCourseById(courseId);

    const courseData = useAppSelector((state) => state.course);
    const course = courseId ? courseData.data : null;

    return (
        <ReportPageContainer width={1000} loading={false}>
            <ReportPageHeader newReport={true} />
            <NewReportForm course={course} />
        </ReportPageContainer>
    );
};

export default NewReport;
