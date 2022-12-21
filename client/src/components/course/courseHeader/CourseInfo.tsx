import React from "react";
import { useParams } from "react-router-dom";
import { openModal } from "react-url-modal";
import styled from "styled-components";

import BadgeRatedEnrolled from "./courseInfo/BadgeRatedEnrolled";
import { useAuth } from "@internals/hooks";
import { User } from "@internals/types";

const Container = styled.div`
    margin: 0 40px;
    flex: 1;
`;

const Title = styled.div`
    font-weight: 700;
    color: white;
    max-width: 700px;
    font-size: 32px;
    line-height: 1.2;
    margin-bottom: 8px;
`;

const Description = styled.div`
    font-size: 19px;
    color: white;
    max-width: 700px;
    margin-bottom: 11px;
    line-height: 1.4;
`;

const Instructor = styled.span`
    font-size: 13px;
    margin-bottom: 8px;
    color: #cebffc;
    text-decoration: underline;
`;

const Button = styled.button`
    width: 240px;
    height: 48px;
    font-weight: 700;
    font-size: 16px;
    margin: 0 auto;
    margin-top: 16px;
    background-color: #a435f0;
    border: none;
    color: white;
`;

const CourseInfo: React.FC<{
    title: string;
    description: string;
    instructor: string;
    rating: number;
}> = ({ title, description, rating, instructor }) => {
    const {
        auth: { userType }
    } = useAuth();

    rating = Number(rating.toFixed(1));

    const { courseId } = useParams();

    const onClick = () => {
        openModal({
            name: "addReview",
            params: {
                courseId
            }
        });
    };

    return (
        <Container>
            <Title>{title}</Title>
            <Description>{description}</Description>
            <BadgeRatedEnrolled rating={rating} />
            <div>
                Created by <Instructor>{instructor}</Instructor>
            </div>
            {(userType === User.INDIVIDUAL_TRAINEE || userType === User.CORPORATE_TRAINEE) && (
                <Button onClick={onClick}>Add Review</Button>
            )}
        </Container>
    );
};

export default CourseInfo;
