import React from "react";
import styled from "styled-components";

import CoursesList from "./coursesListWithFilters/CoursesList";
import Filter from "./coursesListWithFilters/Filter";
import { Course as ICourseProps } from "@internals/types";

const CoursesContainer = styled.div`
    display: flex;
`;

const SideMenu = styled.div`
    width: 20%;
`;

const CoursesListWithFilters: React.FC<{
    courses: ICourseProps[];
    addCourse?: boolean;
    showStatus?: boolean;
}> = ({ courses, showStatus }) => {
    return (
        <CoursesContainer>
            <SideMenu>
                <Filter />
            </SideMenu>
            <CoursesList courses={courses} showStatus={showStatus} />
        </CoursesContainer>
    );
};

export default CoursesListWithFilters;
