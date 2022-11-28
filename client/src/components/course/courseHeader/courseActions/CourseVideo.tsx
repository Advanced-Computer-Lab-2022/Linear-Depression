import React from "react";
import styled from "styled-components";

import { getVideoId } from "@internals/services";

const Image = styled.img`
    height: 191px;
    width: 320px
    border: 2px solid white;
    text-align: center;
    background-color: lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
`;

const Container = styled.div`
    // overflow: hidden;
    padding-bottom: 56.25%;
    position: relative;
    height: 0;
    margin-bottom: 26px;
`;

const Iframe = styled.iframe`
    position: absolute;
    height: 191px;
    position: relative;
    display: inline-block;
`;

const CourseVideo: React.FC<{ videoUrl?: string }> = ({ videoUrl }) => {
    if (!videoUrl) {
        return <Image src="https://vishwaentertainers.com/wp-content/uploads/2020/04/No-Preview-Available.jpg" />;
    }

    const videoId = getVideoId(videoUrl);

    return (
        <Container className="video-responsive">
            <Iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </Container>
    );
};

export default CourseVideo;
