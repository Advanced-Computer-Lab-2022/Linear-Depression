import React from "react";
import styled from "styled-components";

const Title = styled.div`
    font-size: 30px;
    font-weight: bold;
    padding: 8px;
    margin-top: 24px;
`;

const Description = styled.div`
    display: flex;
    margin-bottom: 10px;
    margin-left: 10px;
`;

const CourseDescription: React.FC<{
    description: string;
}> = ({ description }) => {
    return (
        <>
            <Title>Course Description</Title>
            <Description>{description}</Description>
        </>
    );
};

export default CourseDescription;
