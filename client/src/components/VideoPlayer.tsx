import React from "react";
import ReactPlayer from "react-player/lazy";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { getEnrollment, useAppDispatch, useAppSelector } from "@internals/redux";
import { getVideoEmbedUrl, updateEnrollment, updateVideoOfLessonAsSeen } from "@internals/services";

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
    const { courseId, lessonId } = useParams();

    const enrollment = useAppSelector((state) => state.enrollment);
    const dispatch = useAppDispatch();

    const enrollmentId = enrollment.data?._id;

    const onEnded = () => {
        if (lessonId && enrollmentId) {
            const newEnrollment = updateVideoOfLessonAsSeen(enrollment.data, lessonId);

            updateEnrollment(enrollmentId, newEnrollment)
                .then(() => {
                    console.log("Updated enrollment", newEnrollment);
                    dispatch(getEnrollment(courseId));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    try {
        const embedURL = getVideoEmbedUrl(videoUrl);
        return (
            <Container>
                <ReactPlayer
                    height={height}
                    width={height * 1.7777777777777777}
                    url={embedURL}
                    onEnded={onEnded} // FIXME: Check lessonId is valid before calling this
                    controls={true}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </Container>
        );
    } catch (error) {
        return <Image src="https://www.messagetech.com/wp-content/themes/ml_mti/images/no-image.jpg" />;
    }
};

export default VideoPlayer;
