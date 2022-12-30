import React from "react";
import styled from "styled-components";

import CourseCard from "./coursesList/CourseCard";
import LoadingCard from "./coursesList/LoadingCard";
import { useAppSelector } from "@internals/redux";
import { Course as ICourseProps } from "@internals/types";

const CoursesListContainer = styled.div`
    justify-content: right;
`;

const CoursesList: React.FC<{ courses: ICourseProps[]; showPrice: boolean; showStatus: boolean }> = ({
    courses,
    showPrice,
    showStatus
}) => {
    const { loading } = useAppSelector((state) => state.coursesList);

    if (loading) {
        return (
            <CoursesListContainer>
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
            </CoursesListContainer>
        );
    }

    return (
        <CoursesListContainer>
            {courses.length === 0 && (
                <p
                    style={{
                        textAlign: "center",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "var(--color-grey-dark-1)",
                        margin: "100px 0"
                    }}
                >
                    No courses available right now
                </p>
            )}
            {courses.map((course) => (
                <CourseCard key={course._id} course={course} showPrice={showPrice} showStatus={showStatus} />
            ))}
        </CoursesListContainer>
    );
};

export default CoursesList;
