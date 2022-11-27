import React from "react";
import StarRatings from "react-star-ratings";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
`;

const Rating = styled.p`
    color: #f2ca8c;
    font-weight: 700;
    font-size: 14px;
    margin-right: 4px;
    margin-top: 5px;
`;

const StyledStarRatings = styled(StarRatings)`
    height: 22px;
`;

const RatesCount = styled.span`
    color: #cebffc;
    text-decoration: underline;
    font-size: 14px;
    margin-top: 5px;
    margin-left: 2px;
`;

const EnrollsCount = styled.span`
    color: white;
    font-size: 14px;
    margin-top: 5px;
    margin-left: 5px;
`;

const BadgeRatedEnrolled: React.FC<{
    rating: number;
}> = ({ rating }) => {
    return (
        <Container>
            <Rating>{rating}</Rating>
            <StyledStarRatings rating={rating} starDimension="14px" starSpacing="1px" starRatedColor="#f2ca8c" />
            <RatesCount>18,097 ratings</RatesCount>
            <EnrollsCount>191,375 students</EnrollsCount>
        </Container>
    );
};

export default BadgeRatedEnrolled;
