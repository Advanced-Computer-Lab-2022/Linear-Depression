import React from "react";
import CoursesList from "./CoursesList";
import Filter from "./Filter";
import styled from "styled-components";
import ICourseProps from "../types/Course";
import CheckBoxLists from "./CheckBoxLists";
import StarRating from "./StarRating";
import PriceFilter from "./PriceFilter";

const CoursesContainer = styled.div`
    display: flex;
`;

const SideMenu = styled.div`
    width: 25%;
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
                    children={{ checkbox: CheckBoxLists, rating: StarRating, price: PriceFilter }}
                />
            </SideMenu>

            <CoursesList courses={courses} />
        </CoursesContainer>
    );
};

export default CoursesWithFiltersPanel;
