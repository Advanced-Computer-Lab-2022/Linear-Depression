import React from "react";
import styled from "styled-components";
import { Course as ICourseProps } from "@internals/types";
import CourseCard from "./coursesList/CourseCard";

const CoursesListContainer = styled.div`
    width: 80%;
    margin-left: auto !important;
    justify-content: right;
`;

const CoursesList: React.FC<{ courses: ICourseProps[] }> = ({ courses }) => {
    return (
        <CoursesListContainer>
            {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
            ))}
        </CoursesListContainer>
    );
};

export default CoursesList;
