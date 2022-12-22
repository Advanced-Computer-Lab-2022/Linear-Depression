import React from "react";
import { openModal } from "react-url-modal";
import styled from "styled-components";

import { CoursePrice, VideoPlayer } from "@internals/components";
import { useAuth } from "@internals/hooks";
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
    return (
        <MainContainer>
            <VideoPlayer videoUrl={videoUrl} height={191} />
            <SubContainer>
                <PriceSection>
                    <CoursePrice currency={currency} price={price} promotion={promotion} horizontalView={true} />
                </PriceSection>
                {userType === User.INSTRUCTOR ? (
                    <Button onClick={openAddPromotionModal}>Add Promotion</Button>
                ) : (
                    <Button>Enroll now</Button>
                )}
            </SubContainer>
        </MainContainer>
    );
};

export default CourseActions;
