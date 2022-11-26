import React from "react";
import styled from "styled-components";

const Image = styled.img`
    height: 191px;
    border: 2px solid white;
    text-align: center;
    position: relative;
    display: inline-block;
`;

const CourseVideo: React.FC = () => {
    const imgSrc = "https://img-c.udemycdn.com/course/240x135/405878_e5a0_3.jpg";
    return <Image src={imgSrc}></Image>;
};

export default CourseVideo;
