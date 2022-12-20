import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { ContentAccordion, CourseNavbar } from "@internals/components";
import { VideoPlayer } from "@internals/components";
import { useFetchCourseById, useFetchLessonById, useFetchMyEnrollement } from "@internals/hooks";
import { useAppSelector } from "@internals/redux";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    // align-items: ;
    width: 100%;
    height: 100%;
    padding: 10px 40px;
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

const Title = styled.h1``;

const Description = styled.p``;

const SideMenu = styled.div`
    width: 40%;
`;

const Lesson: React.FC = () => {
    const { courseId, lessonId } = useParams();
    useFetchMyEnrollement(courseId);
    useFetchCourseById(courseId);
    const course = useAppSelector((state) => state.course);
    const { lesson } = useFetchLessonById(courseId, lessonId);
    if (!lesson.data) return <div>Loading....</div>;
    return (
        <>
            <CourseNavbar />
            <HorizontalContainer>
                <Container>
                    <VideoContainer>
                        <VideoPlayer videoUrl={lesson.data.video?.videoLink} height={550} />
                    </VideoContainer>
                    <Title>{lesson.data.video?.title}</Title>
                    <Description>{lesson.data.video?.description}</Description>
                </Container>
                <SideMenu>
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
