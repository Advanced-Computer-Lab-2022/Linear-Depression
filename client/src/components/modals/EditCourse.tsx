import { Dialog, DialogContent, DialogContentText, DialogActions, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector, getCourse } from "@internals/redux";
import { editCourse } from "@internals/services";

const HorizontalView = styled.div`
    display: flex;
`;

const EditCourse: React.FC = () => {
    const navigate = useNavigate();
    const closeModal = () => {
        navigate(-1);
    };

    const handleClose = () => {
        closeModal();
    };
    const { data } = useAppSelector((state) => state.course);
    const [title, setTitle] = useState(data.title);
    const [subject, setSubject] = useState(data.subject);
    const [description, setDescription] = useState(data.description);
    const [price, setPrice] = useState(data.price);
    const [preview, setPreview] = useState("");

    const dispatch = useAppDispatch();
    const handleSubmit = () => {
        const course: { title: string; subject: string; description: string; price: number; preview?: string } = {
            title,
            subject,
            description,
            price
        };

        if (preview.length > 0) {
            course.preview = preview;
        }

        editCourse(data._id, course)
            .then(() => {
                dispatch(getCourse(data._id));
            })
            .catch((error) => {
                console.log(error);
            });

        closeModal();
    };

    return (
        <Dialog open={true}>
            <DialogContent>
                <DialogContentText>Edit Course</DialogContentText>
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
                    id="description"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="outlined"
                    multiline
                    minRows={2}
                    maxRows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="preview"
                    label="Preview Video URL"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={preview}
                    onChange={(e) => setPreview(e.target.value)}
                />
                <HorizontalView>
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="price"
                        label="Subject"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="price"
                        label="Price"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={price}
                        onChange={(e) => setPrice(e.target.value as unknown as number)}
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

export default EditCourse;
