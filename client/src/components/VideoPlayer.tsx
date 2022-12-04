import React from "react";
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
    // width: 100%;
`;

const Iframe = styled.iframe<{ height: number }>`
    position: absolute;
    height: ${(props) => props.height}px;
    position: relative;
    display: inline-block;
`;

const VideoPlayer: React.FC<{ videoUrl?: string; height: number }> = ({ videoUrl, height }) => {
    try {
        const embedURL = getVideoEmbedUrl(videoUrl);
        return (
            <Container>
                <Iframe
                    height={height}
                    width={height * 1.7777777777777777}
                    src={embedURL}
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
