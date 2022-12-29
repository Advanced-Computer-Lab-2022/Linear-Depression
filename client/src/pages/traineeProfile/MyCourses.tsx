import React from "react";
import styled from "styled-components";

import { useFetchMyCourses } from "@internals/hooks";
import { useAppSelector } from "@internals/redux";
import { CoursesList } from "@internals/components";

const Containter = styled.div`
    margin: 24px;
`;

const Title = styled.div`
    font-size: 30px;
    font-weight: bold;
    padding: 8px;
    margin-top: 24px;
`;

const MyCourses: React.FC = () => {
    useFetchMyCourses();
    const courses = useAppSelector((state) => state.coursesList);

    return (
        <>
            <Title>My Courses</Title>
            <Containter>
                <CoursesList courses={courses.data} showPrice={false} showStatus={false} />
            </Containter>
        </>
    );
};

export default MyCourses;
