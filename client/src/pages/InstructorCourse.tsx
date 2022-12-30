import AddIcon from "@mui/icons-material/Add";
import { CircularProgress } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { openModal } from "react-url-modal";
import styled from "styled-components";

import { CourseContent, CourseHeader, CourseReviews, FloatingButton } from "@internals/components";
import { useAuth, useFetchCourseById, useFetchMyEnrollment } from "@internals/hooks";
import { useAppSelector } from "@internals/redux";
import { User } from "@internals/types";

const Container = styled.div`
    margin: 0 30% 0 100px;
`;

const InstructorCourse: React.FC = () => {
    const {
        auth: { userType }
    } = useAuth();
    const { courseId } = useParams();
    useFetchCourseById(courseId);
    useFetchMyEnrollment(courseId);
    const { data, loading } = useAppSelector((state) => state.course);

    const onClick = () => {
        openModal({
            name: "addLesson",
            params: {
                courseId
            }
        });
    };

    if (loading || !data) {
        return (
            <CircularProgress
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                }}
            />
        );
    }

    return (
        <>
            <CourseHeader />
            <Container>
                <CourseContent lessons={data.lessons} />
                <CourseReviews />
            </Container>
            {userType === User.INSTRUCTOR && !data.isPublished && (
                <FloatingButton onClick={onClick}>
                    <AddIcon />
                </FloatingButton>
            )}
        </>
    );
};

export default InstructorCourse;
