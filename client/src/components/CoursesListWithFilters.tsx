import React from "react";
import styled from "styled-components";

import BrowseBy from "./coursesListWithFilters/BrowseBy";
import CoursesList from "./coursesListWithFilters/CoursesList";
import Filter from "./coursesListWithFilters/Filter";
import { Course as ICourseProps } from "@internals/types";

const PageContentContainer = styled.div`
    display: flex;
`;

const SideMenu = styled.div`
    width: 20%;
`;

const CoursesListContainer = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
`;

const CoursesListWithFilters: React.FC<{
    courses: ICourseProps[];
    addCourse?: boolean;
    showStatus?: boolean;
    showPrice?: boolean;
    showBrowseBy?: boolean;
}> = ({ courses, showPrice, showStatus, showBrowseBy = true }) => {
    return (
        <PageContentContainer>
            <SideMenu>
                <Filter />
            </SideMenu>

            <CoursesListContainer>
                {showBrowseBy && <BrowseBy />}
                <CoursesList courses={courses} showPrice={showPrice} showStatus={showStatus} />
            </CoursesListContainer>
        </PageContentContainer>
    );
};

export default CoursesListWithFilters;
