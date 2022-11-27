import React from "react";
import styled from "styled-components";

import CourseVideo from "./courseActions/CourseVideo";
import { CoursePrice } from "@internals/components";
import { Promotion } from "@internals/types";

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
}> = ({ price, promotion, currency }) => {
    return (
        <MainContainer>
            <CourseVideo />
            <SubContainer>
                <PriceSection>
                    <CoursePrice currency={currency} price={price} promotion={promotion} horizontalView={true} />
                </PriceSection>
                <Button>Enroll now</Button>
            </SubContainer>
        </MainContainer>
    );
};

export default CourseActions;
