import React from "react";
import ReactPlayer from "react-player/lazy";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { getVideoEmbedUrl } from "@internals/services";

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
    padding-bottom: 56.25%;
    position: relative;
    height: 0;
    margin-bottom: 26px;
`;

const VideoPlayer: React.FC<{ videoUrl?: string; height: number }> = ({ videoUrl, height }) => {
    const { lessonId } = useParams();
    try {
        const embedURL = getVideoEmbedUrl(videoUrl);
        return (
            <Container>
                <ReactPlayer
                    height={height}
                    width={height * 1.7777777777777777}
                    url={embedURL}
                    onEnded={() => console.log(lessonId)} // FIXME: Check lessonId is valid before calling this
                    controls={true}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </Container>
        );
    } catch (error) {
        return <Image src="https://vishwaentertainers.com/wp-content/uploads/2020/04/No-Preview-Available.jpg" />;
    }
};

export default VideoPlayer;
