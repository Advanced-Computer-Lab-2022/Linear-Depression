import React from "react";
import { openModal } from "react-url-modal";
import styled from "styled-components";

import { CoursePrice, VideoPlayer } from "@internals/components";
import { useAuth, useFetchMyAccessRequest, useFetchMyRefundRequest } from "@internals/hooks";
import { useAppSelector } from "@internals/redux";
import { cancelRefundRequest, sendAccessRequest, sendRefundRequest } from "@internals/services";
import { handleCheckout } from "@internals/services";
import { Promotion, User } from "@internals/types";

const MainContainer = styled.div``;

const SubContainer = styled.div`
    margin: 0 16px;
`;

const Button = styled.button`
    width: 100%;
    height: 48px;
    font-weight: 700;
    font-size: 16px;
    margin: 0 auto;
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
}> = ({ price, promotion, currency, courseId, videoUrl }) => {
    const enrollment = useAppSelector((state) => state.enrollment);

    const { accessRequest, updateAccessRequest } = useFetchMyAccessRequest(courseId);
    const { refundRequest, updateRefundRequest } = useFetchMyRefundRequest(enrollment.data?._id);

    const {
        auth: { userType }
    } = useAuth();
    const openAddPromotionModal = () => {
        openModal({
            name: "addPromotion",
            params: {
                courseId
            }
        });
    };

    const handleEnroll = () => {
        if (userType === User.CORPORATE_TRAINEE) {
            sendAccessRequest(courseId)
                .then(() => {
                    updateAccessRequest();
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (userType === User.INDIVIDUAL_TRAINEE) {
            if (price > 0) {
                handleCheckout(courseId);
            } else {
                console.log("free course");
            }
        }
    };

    const handleRefund = () => {
        if (userType === User.INDIVIDUAL_TRAINEE) {
            sendRefundRequest(enrollment.data?._id)
                .then(() => {
                    updateRefundRequest();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const handleCancelRefund = () => {
        if (userType === User.INDIVIDUAL_TRAINEE) {
            cancelRefundRequest(enrollment.data?._id)
                .then(() => {
                    updateRefundRequest();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <MainContainer>
            <VideoPlayer videoUrl={videoUrl} height={191} />
            <SubContainer>
                {(userType === User.INSTRUCTOR || userType === User.INDIVIDUAL_TRAINEE) && enrollment.data == null && (
                    <PriceSection>
                        <CoursePrice currency={currency} price={price} promotion={promotion} horizontalView={true} />
                    </PriceSection>
                )}
                {userType === User.INSTRUCTOR && <Button onClick={openAddPromotionModal}>Add Promotion</Button>}
                {(userType === User.CORPORATE_TRAINEE || userType === User.INDIVIDUAL_TRAINEE) &&
                    enrollment.data == null &&
                    accessRequest.data == null && <Button onClick={handleEnroll}>Enroll Now</Button>}
                {userType === User.INDIVIDUAL_TRAINEE &&
                    enrollment.data !== null &&
                    enrollment.data?.progress < 50 &&
                    refundRequest.data == null && <Button onClick={handleRefund}>Request Refund</Button>}
                {userType === User.INDIVIDUAL_TRAINEE && enrollment.data && refundRequest.data && (
                    <Button onClick={handleCancelRefund}>Cancel Refund</Button>
                )}
                {enrollment.data !== null && accessRequest.data && accessRequest.data.status === "PENDING" && (
                    <Button disabled>Access Request Sent</Button>
                )}
            </SubContainer>
        </MainContainer>
    );
};

export default CourseActions;
