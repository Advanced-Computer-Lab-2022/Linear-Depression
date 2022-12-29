import LoadingButton from "@mui/lab/LoadingButton";
import React, { useState } from "react";
import { openModal } from "react-url-modal";
import styled from "styled-components";

import { CoursePrice, VideoPlayer } from "@internals/components";
import { useAuth, useFetchMyAccessRequest, useFetchMyRefundRequest } from "@internals/hooks";
import { getEnrollment, getCourse, useAppDispatch, useAppSelector } from "@internals/redux";
import {
    cancelRefundRequest,
    enrollOnCourse,
    editCourse,
    sendAccessRequest,
    sendRefundRequest
} from "@internals/services";
import { handleCheckout } from "@internals/services";
import { Promotion, User } from "@internals/types";

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
    isPublished: boolean;
}> = ({ price, promotion, currency, courseId, videoUrl, isPublished }) => {
    const enrollment = useAppSelector((state) => state.enrollment);
    const dispatch = useAppDispatch();

    const { accessRequest, updateAccessRequest } = useFetchMyAccessRequest(courseId);
    const { refundRequest, updateRefundRequest } = useFetchMyRefundRequest(enrollment.data?._id);

    const {
        auth: { userType }
    } = useAuth();

    const [loading, setLoading] = useState(false);

    const openAddPromotionModal = () => {
        openModal({
            name: "addPromotion",
            params: {
                courseId
            }
        });
    };

    const handlePublish = () => {
        editCourse(courseId, { isPublished: true })
            .then(() => {
                dispatch(getCourse(courseId));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleEnroll = () => {
        setLoading(true);
        if (userType === User.CORPORATE_TRAINEE) {
            sendAccessRequest(courseId)
                .then(() => {
                    updateAccessRequest();
                })
                .catch((err) => {
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
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        }
    };

    const handleRefund = () => {
        setLoading(true);
        if (userType === User.INDIVIDUAL_TRAINEE) {
            sendRefundRequest(enrollment.data?._id)
                .then(() => {
                    updateRefundRequest();
                })
                .catch((err) => {
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
                    updateRefundRequest();
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                });
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
                {userType === User.INSTRUCTOR && isPublished ? (
                    <Button onClick={openAddPromotionModal}>Add Promotion</Button>
                ) : (
                    <Button onClick={handlePublish}>Publish</Button>
                )}
                {(userType === User.CORPORATE_TRAINEE || userType === User.INDIVIDUAL_TRAINEE) &&
                    enrollment.data == null &&
                    accessRequest.data == null && (
                        <Button loading={loading} onClick={handleEnroll}>
                            Enroll Now
                        </Button>
                    )}
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
                {enrollment.data !== null && accessRequest.data && accessRequest.data.status === "PENDING" && (
                    <Button disabled>Access Request Sent</Button>
                )}
            </SubContainer>
        </MainContainer>
    );
};

export default CourseActions;
