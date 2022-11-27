import { Dialog, DialogContent, DialogContentText, DialogActions, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { UserContext } from "@internals/contexts";
import { getMyCourses, getSubjects, useAppDispatch } from "@internals/redux";
import { addCourse } from "@internals/services";

const HorizontalView = styled.div`
    display: flex;
`;

const AddCourse: React.FC = () => {
    const navigate = useNavigate();
    const closeModal = () => {
        navigate(-1);
    };

    const handleClose = () => {
        closeModal();
    };

    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const { userId } = useContext(UserContext);

    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const handleSubmit = () => {
        addCourse({ title, subject, description, price, instructor: userId }).then(() => {
            dispatch(getSubjects());
            dispatch(getMyCourses(searchParams));
            closeModal();
        });
    };

    return (
        <Dialog open={true}>
            <DialogContent>
                <DialogContentText>Add a new Course</DialogContentText>
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
                        onChange={(e) => setPrice(e.target.value)}
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

export default AddCourse;
