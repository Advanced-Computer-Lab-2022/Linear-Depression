import LoadingButton from "@mui/lab/LoadingButton";
import { Dialog, DialogContent, DialogContentText, DialogActions, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Yup from "yup";

import { getCourse, useAppDispatch } from "@internals/redux";
import { editLesson } from "@internals/services";
import { useToast } from "@internals/hooks";
import { validateFormData } from "@internals/utils";

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

    const [formErrors, setFormErrors] = useState(new Map());
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    const validationRules = {
        title: Yup.string().required("Please enter a title"),
        totalHours: Yup.number().required("Please enter a duration"),
        videoTitle: Yup.string().required("Please enter a video title"),
        videoLink: Yup.string()
            .required("Please enter video link ")
            .matches(/^(http(s)?:\/\/)?((w){3}.)?youtube\.com\/watch\?v=/, "Please enter a valid youtube video url"),
        videoDescription: Yup.string().required("Please enter a video description")
    };

    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        setLoading(true);
        setFormErrors(new Map());
        const formData = {
            title,
            totalHours,
            videoTitle,
            videoLink,
            videoDescription
        };
        validateFormData(formData, validationRules)
            .then(async (data) => {
                const validatedData = data as unknown as {
                    title: string;
                    totalHours: number;
                    videoTitle: string;
                    videoLink: string;
                    videoDescription: string;
                };

                const updatedLesson = {
                    title: validatedData.title,
                    totalHours: validatedData.totalHours,
                    video: {
                        title: validatedData.videoTitle,
                        videoLink: validatedData.videoLink,
                        description: validatedData.videoDescription
                    }
                };

                editLesson(courseId, lessonId, updatedLesson)
                    .then(() => {
                        showToast({ message: "Lesson Updated Successfully", type: "success" });
                        dispatch(getCourse(courseId));
                        closeModal();
                    })
                    .catch(() => {
                        showToast({ message: "Failed to Update Lesson Try Later", type: "error" });
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            })
            .catch((errors) => {
                setFormErrors(errors);
                setLoading(false);
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
                    error={formErrors.has("title")}
                    helperText={formErrors.get("title")}
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
                    error={formErrors.has("totalHours")}
                    helperText={formErrors.get("totalHours")}
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
                    error={formErrors.has("videoTitle")}
                    helperText={formErrors.get("videoTitle")}
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
                    error={formErrors.has("videoLink")}
                    helperText={formErrors.get("videoLink")}
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
                        error={formErrors.has("videoDescription")}
                        helperText={formErrors.get("videoDescription")}
                    />
                </HorizontalView>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <LoadingButton loading={loading} onClick={handleSubmit}>
                    Submit
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default EditLesson;
