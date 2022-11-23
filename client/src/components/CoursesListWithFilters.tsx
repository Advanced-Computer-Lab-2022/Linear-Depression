import React from "react";
import CoursesList from "./coursesListWithFilters/CoursesList";
import Filter from "./coursesListWithFilters/Filter";
import styled from "styled-components";
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
}> = ({ courses }) => {
    return (
        <CoursesContainer>
            <SideMenu>
                <Filter />
            </SideMenu>
            <CoursesList courses={courses} />
        </CoursesContainer>
    );
};

export default CoursesListWithFilters;
