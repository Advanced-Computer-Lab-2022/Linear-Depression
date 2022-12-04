import { Dialog, DialogContent, DialogContentText, DialogActions, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { getCourse, useAppDispatch } from "@internals/redux";
import { editLesson } from "@internals/services";

const HorizontalView = styled.div`
    display: flex;
`;

const EditLesson: React.FC<{
    params: {
        courseId: string;
        lessonId: string;
        lessonTitle: string;
        lessonTotalHours: number;
        lessonVideo: {
            title: string;
            videoLink: string;
            description: string;
        };
    };
}> = ({ params }) => {
    const navigate = useNavigate();

    const closeModal = () => {
        navigate(-1);
    };

    const handleClose = () => {
        closeModal();
    };

    const { courseId, lessonId, lessonTitle, lessonTotalHours, lessonVideo } = params;

    const [title, setTitle] = useState(lessonTitle);
    const [totalHours, setTotalHours] = useState(lessonTotalHours);
    const [videoTitle, setVideoTitle] = useState(lessonVideo ? lessonVideo.title : "");
    const [videoLink, setVideoLink] = useState(lessonVideo ? lessonVideo.videoLink : "");
    const [videoDescription, setVideoDescription] = useState(lessonVideo ? lessonVideo.description : "");

    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        const lesson = {
            title,
            totalHours,
            video: {
                title: videoTitle,
                videoLink: videoLink,
                description: videoDescription
            }
        };

        editLesson(courseId, lessonId, lesson)
            .then(() => {
                dispatch(getCourse(courseId));
                closeModal();
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <Dialog open={true}>
            <DialogContent>
                <DialogContentText>Edit Lesson</DialogContentText>
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="totalHours"
                    label="Total Hours"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={totalHours}
                    onChange={(e) => setTotalHours(e.target.value as unknown as number)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="videoTitle"
                    label="Video Title"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="videoURL"
                    label="Video URL"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                />
                <HorizontalView>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="videoDescription"
                        label="Video Description"
                        type="text"
                        fullWidth
                        multiline
                        minRows={2}
                        maxRows={4}
                        variant="outlined"
                        value={videoDescription}
                        onChange={(e) => setVideoDescription(e.target.value)}
                    />
                </HorizontalView>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditLesson;
