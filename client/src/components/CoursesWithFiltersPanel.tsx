import React from "react";
import CoursesList from "./CoursesList";
import Filter from "./Filter";
import styled from "styled-components";
import ICourseProps from "../types/Course";
import CheckBoxLists from "./CheckBoxLists";
import StarRating from "./StarRating";

const CoursesContainer = styled.div`
    display: flex;
`;

const SideMenu = styled.div`
    width: 20%;
`;

const CoursesWithFiltersPanel: React.FC<{
    courses: ICourseProps[];
    subjects: string[];
    addCourse?: boolean;
}> = ({ courses, subjects }) => {
    return (
        <CoursesContainer>
            <SideMenu>
                <Filter
                    titles={["Subject", "Price", "Rating"]}
                    items={subjects}
                    children={{ checkbox: CheckBoxLists, rating: StarRating }}
                />
            </SideMenu>

            <CoursesList courses={courses} />
        </CoursesContainer>
    );
};

export default CoursesWithFiltersPanel;
