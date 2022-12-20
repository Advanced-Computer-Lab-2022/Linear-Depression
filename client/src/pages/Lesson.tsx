import { Button } from "@mui/material";
import MDEditor, { commands } from "@uiw/react-md-editor";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { ContentAccordion, CourseNavbar } from "@internals/components";
import { VideoPlayer } from "@internals/components";
import { useFetchCourseById, useFetchLessonById, useFetchMyEnrollement, useFetchMyNote } from "@internals/hooks";
import { useAppSelector } from "@internals/redux";
import { addNote, editNote, downloadPDF, saveToPDF } from "@internals/services";

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

    const { note, content, savedContent, setSavedContent, setContent, updateNote } = useFetchMyNote(lessonId);

    useFetchCourseById(courseId);

    const course = useAppSelector((state) => state.course);
    const { lesson } = useFetchLessonById(courseId, lessonId);

    const saveNote = async () => {
        console.log("Save: ", content);
        if (note.data) {
            console.log("Update");
            const newNote = note.data;
            newNote.content = content;
            await editNote(lessonId, newNote._id, newNote);
        } else {
            addNote(lessonId, content)
                .then(() => {
                    updateNote();
                })
                .catch((err) => {
                    console.log("Add error: ", err);
                });
        }
    };

    const handleDownload = () => {
        saveNote()
            .then(async () => {
                await saveToPDF(lessonId, note.data?._id);
                downloadPDF(note.data?._id);
            })
            .catch((err) => {
                console.log("Download error: ", err);
            });
    };

    const MINUTE_MS = 10000;

    useEffect(() => {
        const interval = setInterval(() => {
            if (savedContent !== content) {
                setSavedContent(content);
                saveNote();
            }
        }, MINUTE_MS);

        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [content, savedContent]);

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
                    <MDEditor
                        value={content}
                        onChange={setContent}
                        extraCommands={[commands.fullscreen, commands.codePreview, commands.codeLive]}
                    />
                    <MDEditor.Markdown source={content} style={{ whiteSpace: "pre-wrap" }} />
                    <Button onClick={handleDownload}>download</Button>
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
