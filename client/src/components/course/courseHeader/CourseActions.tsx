import LoadingButton from "@mui/lab/LoadingButton";
import Tooltip from "@mui/material/Tooltip";
import React, { useState } from "react";
import { openModal } from "react-url-modal";
import styled from "styled-components";

import { CoursePrice, VideoPlayer } from "@internals/components";
import { useAuth, useFetchMyAccessRequest, useToast } from "@internals/hooks";
import { getEnrollment, useAppDispatch, useAppSelector } from "@internals/redux";
import { enrollOnCourse, sendAccessRequest } from "@internals/services";
import { handleCheckout } from "@internals/services";
import { CourseStatus, Promotion, User } from "@internals/types";

const MainContainer = styled.div``;

const SubContainer = styled.div`
    margin: 0 16px;
`;

const Button = styled(LoadingButton)`
    width: 100%;
    height: 48px;
    font-weight: 700;
    font-size: 16px;
    margin: 0 auto;
    background-color: white;
    color: black;
    &:hover {
        background-color: #f5f3fe;
        color: black;
    }
`;

const PriceSection = styled.div`
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -0.1rem;
    margin-bottom: -8px;
    margin-top: 8px;
`;

const CourseActions: React.FC<{
    price: number;
    currency: string;
    promotion: Promotion;
    courseId: string;
    videoUrl?: string;
    status: CourseStatus;
    isOwner: boolean;
}> = ({ price, promotion, currency, courseId, videoUrl, status, isOwner }) => {
    const enrollment = useAppSelector((state) => state.enrollment);
    const dispatch = useAppDispatch();

    const { accessRequest, updateAccessRequest } = useFetchMyAccessRequest(courseId);

    const {
        auth: { userType }
    } = useAuth();
    const { showToast } = useToast();

    const [loading, setLoading] = useState(false);

    const openAddPromotionModal = () => {
        openModal({
            name: "addPromotion",
            params: {
                courseId
            }
        });
    };

    const handleEnroll = () => {
        setLoading(true);
        if (userType === User.CORPORATE_TRAINEE) {
            sendAccessRequest(courseId)
                .then(() => {
                    showToast({
                        message: "Access Request sent successfully",
                        type: "success"
                    });
                    updateAccessRequest();
                })
                .catch((err) => {
                    showToast({
                        message: "Failed to send access request.Try Later",
                        type: "error"
                    });
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else if (userType === User.INDIVIDUAL_TRAINEE) {
            if (price > 0) {
                handleCheckout(courseId);
            } else {
                enrollOnCourse(courseId)
                    .then(() => {
                        dispatch(getEnrollment(courseId));
                        showToast({
                            message: "Enrolled Successfully successfully",
                            type: "success"
                        });
                    })
                    .catch(() => {
                        showToast({
                            message: "Failed to enroll",
                            type: "error"
                        });
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        }
    };

    return (
        <MainContainer>
            <VideoPlayer videoUrl={videoUrl} height={191} />
            <SubContainer>
                {(userType === User.INSTRUCTOR || userType === User.INDIVIDUAL_TRAINEE) && enrollment.data == null ? (
                    <PriceSection>
                        <CoursePrice currency={currency} price={price} promotion={promotion} horizontalView={true} />
                    </PriceSection>
                ) : (
                    <br />
                )}
                {userType === User.INSTRUCTOR && status !== CourseStatus.CLOSED && isOwner && (
                    <Tooltip title={price === 0 ? "Cannot add a promotion to a free course." : ""}>
                        <span>
                            <Button onClick={openAddPromotionModal} disabled={price === 0}>
                                Add Promotion
                            </Button>
                        </span>
                    </Tooltip>
                )}
                {(userType === User.CORPORATE_TRAINEE || userType === User.INDIVIDUAL_TRAINEE) &&
                    enrollment.data == null &&
                    accessRequest.data == null && (
                        <Button loading={loading} onClick={handleEnroll}>
                            Enroll Now
                        </Button>
                    )}

                {enrollment.data !== null && accessRequest.data && accessRequest.data.status === "PENDING" && (
                    <Button disabled>Access Request Sent</Button>
                )}
            </SubContainer>
        </MainContainer>
    );
};

export default CourseActions;
