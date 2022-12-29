import React from "react";
import styled from "styled-components";

import CourseCard from "./coursesList/CourseCard";
import { Course as ICourseProps } from "@internals/types";

const CoursesListContainer = styled.div`
    justify-content: right;
`;

const CoursesList: React.FC<{ courses: ICourseProps[]; showPrice: boolean }> = ({ courses, showPrice }) => {
    return (
        <CoursesListContainer>
            {courses.map((course) => (
                <CourseCard key={course._id} course={course} showPrice={showPrice} />
            ))}
        </CoursesListContainer>
    );
};

export default CoursesList;
