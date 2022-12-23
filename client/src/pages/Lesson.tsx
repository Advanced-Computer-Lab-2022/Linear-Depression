import DescriptionIcon from "@mui/icons-material/Description";
import { Popover } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Note from "./lesson/Note";
import { ContentAccordion, CourseNavbar, FloatingButton } from "@internals/components";
import { VideoPlayer } from "@internals/components";
import { useFetchCourseById, useFetchLessonById } from "@internals/hooks";
import { useAppSelector } from "@internals/redux";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const HorizontalContainer = styled.div`
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
    margin-left: 20px;
`;

const Title = styled.h1``;

const Description = styled.p``;

const SideMenu = styled.div`
    width: 70%;
`;

const CourseContentTitle = styled.h4`
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

    if (!lesson.data) return <div>Loading....</div>;
    return (
        <>
            <CourseNavbar />
            <HorizontalContainer>
                <Container>
                    <VideoContainer>
                        <VideoPlayer videoUrl={lesson.data.video?.videoLink} height={550} />
                    </VideoContainer>
                    <VideoInfoContainer>
                        <Title>{lesson.data.video?.title}</Title>
                        <Description>{lesson.data.video?.description}</Description>
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
                        anchorPosition={{ top: 200, left: 700 }}
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
            </HorizontalContainer>
        </>
    );
};

export default Lesson;
