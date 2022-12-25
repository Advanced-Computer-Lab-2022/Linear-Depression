import AddIcon from "@mui/icons-material/Add";
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
    const { data } = useAppSelector((state) => state.course);

    const onClick = () => {
        openModal({
            name: "addLesson",
            params: {
                courseId
            }
        });
    };

    // TODO: To be replaced with suspense
    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <CourseHeader />
            <Container>
                <CourseContent lessons={data.lessons} />
                <CourseReviews />
            </Container>
            {userType === User.INSTRUCTOR && (
                <FloatingButton onClick={onClick}>
                    <AddIcon />
                </FloatingButton>
            )}
        </>
    );
};

export default InstructorCourse;
