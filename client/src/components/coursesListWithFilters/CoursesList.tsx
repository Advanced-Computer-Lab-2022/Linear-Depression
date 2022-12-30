import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";

import CourseCard from "./coursesList/CourseCard";
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
                <CircularProgress
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }}
                />
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
                        color: "var(--color-grey-dark-1)"
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
