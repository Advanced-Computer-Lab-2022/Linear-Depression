import DescriptionIcon from "@mui/icons-material/Description";
import { Popover } from "@mui/material";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Note from "./lesson/Note";
import { ContentAccordion, CourseNavbar, FloatingButton } from "@internals/components";
import { VideoPlayer } from "@internals/components";
import { useFetchCourseById, useFetchLessonById } from "@internals/hooks";
import { useAppSelector } from "@internals/redux";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

export const HorizontalContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
`;

const VideoContainer = styled.div`
    height: 550px;
    margin-bottom: 26px;
`;

const VideoInfoContainer = styled.div`
    margin: 0 20px;
    background-color: #f7f7f7;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    padding: 20px;
`;

const Title = styled.h1``;

const Description = styled.div``;

const SideMenu = styled.div`
    width: 70%;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin: 0 20px;
`;

export const CourseContentTitle = styled.h4`
    font-size: 20px;
    font-weight: 600;
    padding: 10px;
`;

const Lesson: React.FC = () => {
    const { courseId, lessonId } = useParams();
    useFetchCourseById(courseId);

    const course = useAppSelector((state) => state.course);
    const { lesson } = useFetchLessonById(courseId, lessonId);

    const [open, setOpen] = useState(false);

    return (
        <>
            <CourseNavbar />
            <HorizontalContainer>
                <Container>
                    <VideoContainer>
                        {lesson.data ? (
                            <VideoPlayer videoUrl={lesson.data.video?.videoLink} height={550} />
                        ) : (
                            <Skeleton height={550} width={1.7 * 550} />
                        )}
                    </VideoContainer>
                    <VideoInfoContainer>
                        {lesson.data ? <Title>{lesson.data.video?.title}</Title> : <Skeleton width={300} height={30} />}
                        {lesson.data ? (
                            <Description>{lesson.data.video?.description}</Description>
                        ) : (
                            <>
                                <Skeleton width={500} height={40} />
                                <Skeleton width={500} height={40} />
                            </>
                        )}
                    </VideoInfoContainer>
                    <FloatingButton
                        color="primary"
                        aria-label="add"
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        <DescriptionIcon />
                    </FloatingButton>
                    <Popover
                        anchorReference="anchorPosition"
                        anchorPosition={{ top: 200, left: 1000 }}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "left"
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left"
                        }}
                        open={open}
                    >
                        <Note setOpen={setOpen} />
                    </Popover>
                </Container>
                {lesson.data && (
                    <SideMenu>
                        <CourseContentTitle>Course Content</CourseContentTitle>
                        {course.data?.lessons.map((lesson) => {
                            return (
                                <div>
                                    <ContentAccordion key={lesson._id} lesson={lesson} showLessonStatus={true} />
                                </div>
                            );
                        })}
                    </SideMenu>
                )}
            </HorizontalContainer>
        </>
    );
};

export default Lesson;
