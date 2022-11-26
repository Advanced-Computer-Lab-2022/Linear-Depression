import React from "react";
import styled from "styled-components";

import BadgeRatedEnrolled from "./courseInfo/BadgeRatedEnrolled";

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

const CourseInfo: React.FC<{
    title: string;
    description: string;
    instructor: string;
    rating: number;
}> = ({ title, description, rating, instructor }) => {
    return (
        <Container>
            <Title>{title}</Title>
            <Description>{description}</Description>
            <BadgeRatedEnrolled rating={rating} />
            <div>
                Created by <Instructor>{instructor}</Instructor>
            </div>
        </Container>
    );
};

export default CourseInfo;
