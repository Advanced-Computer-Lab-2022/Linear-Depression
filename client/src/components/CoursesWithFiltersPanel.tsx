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

const CoursesWithFiltersPanel: React.FC<{
    courses: ICourseProps[];
    subjects: string[];
}> = ({ courses, subjects }) => {
    return (
        <div>
            <CoursesContainer>
                <Filter
                    titles={["Subject", "Price", "Rating"]}
                    items={subjects}
                    children={{ checkbox: CheckBoxLists, rating: StarRating }}
                />
                <CoursesList courses={courses} />
            </CoursesContainer>
        </div>
    );
};

export default CoursesWithFiltersPanel;
