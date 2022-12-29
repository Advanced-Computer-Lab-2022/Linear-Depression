import AddIcon from "@mui/icons-material/Add";
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { openModal } from "react-url-modal";
import styled from "styled-components";

import { CourseContent, CourseHeader, CourseReviews, FloatingButton } from "@internals/components";
import { useAuth, useFetchCourseById, useFetchMyEnrollment, useFetchMyRefundRequest, useToast } from "@internals/hooks";
import { useAppSelector } from "@internals/redux";
import { sendRefundRequest, cancelRefundRequest } from "@internals/services";
import { User } from "@internals/types";

const Container = styled.div`
    margin: 0 30% 0 100px;
`;
const Button = styled(LoadingButton)`
    width: 100%;
    height: 48px;
    font-weight: 700;
    font-size: 16px;
    margin: 5px;
    background-color: white;
    color: black;
    &:hover {
        background-color: #f5f3fe;
        color: black;
    }
    border: 1px solid black;
`;
const HorizontalContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const InstructorCourse: React.FC = () => {
    const {
        auth: { userType }
    } = useAuth();
    const { courseId } = useParams();
    useFetchCourseById(courseId);
    useFetchMyEnrollment(courseId);
    const { data } = useAppSelector((state) => state.course);
    const enrollment = useAppSelector((state) => state.enrollment);
    const { refundRequest, updateRefundRequest } = useFetchMyRefundRequest(enrollment.data?._id);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { showToast } = useToast();

    const onClick = () => {
        openModal({
            name: "addLesson",
            params: {
                courseId
            }
        });
    };
    const handleRefund = () => {
        setLoading(true);
        if (userType === User.INDIVIDUAL_TRAINEE) {
            sendRefundRequest(enrollment.data?._id)
                .then(() => {
                    showToast({ message: "Refund request sent successfully", type: "success" });
                    updateRefundRequest();
                })
                .catch((err) => {
                    showToast({ message: "Failed to send refund request", type: "error" });
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const handleCancelRefund = () => {
        setLoading(true);
        if (userType === User.INDIVIDUAL_TRAINEE) {
            cancelRefundRequest(enrollment.data?._id)
                .then(() => {
                    showToast({ message: "Refund request cancelled", type: "success" });
                    updateRefundRequest();
                })
                .catch((err) => {
                    showToast({ message: "Failed to cancel refund request", type: "error" });
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
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
                <HorizontalContainer>
                    <Button
                        onClick={() => {
                            navigate(`/me/reports/new?course_id=${courseId}`);
                        }}
                    >
                        Report An issue
                    </Button>
                    {userType === User.INDIVIDUAL_TRAINEE &&
                        enrollment.data !== null &&
                        enrollment.data?.progress < 50 &&
                        refundRequest.data == null && (
                            <Button loading={loading} onClick={handleRefund}>
                                Request Refund
                            </Button>
                        )}
                    {userType === User.INDIVIDUAL_TRAINEE && enrollment.data && refundRequest.data && (
                        <Button loading={loading} onClick={handleCancelRefund}>
                            Cancel Refund
                        </Button>
                    )}
                </HorizontalContainer>
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
