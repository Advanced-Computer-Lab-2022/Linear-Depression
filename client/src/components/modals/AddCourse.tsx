import { Dialog, DialogContent, DialogContentText, DialogActions, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

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
    const [price, setPrice] = useState(null);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const initialFormError = {
        title: {
            error: false,
            message: ""
        },
        subject: {
            error: false,
            message: ""
        },
        description: {
            error: false,
            message: ""
        },
        price: {
            error: false,
            message: ""
        }
    };

    const [formError, setFormError] = useState(initialFormError);

    const validateForm = () => {
        if (title === "") {
            setFormError({
                ...initialFormError,
                title: {
                    error: true,
                    message: "Title is required"
                }
            });
            return false;
        }
        if (subject === "") {
            setFormError({
                ...initialFormError,
                subject: {
                    error: true,
                    message: "Subject is required"
                }
            });
            return false;
        }
        if (description === "") {
            setFormError({
                ...initialFormError,
                description: {
                    error: true,
                    message: "Description is required"
                }
            });
            return false;
        }
        if (price === null) {
            setFormError({
                ...initialFormError,
                price: {
                    error: true,
                    message: "Price is required"
                }
            });
            return false;
        }
        if (price < 0) {
            setFormError({
                ...initialFormError,
                price: {
                    error: true,
                    message: "Price must be greater than 0"
                }
            });
            return false;
        }

        return true;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            addCourse({ title, subject, description, price }).then(() => {
                dispatch(getSubjects());
                dispatch(getMyCourses(searchParams));
                closeModal();
            });
        }
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
                    error={formError.title.error}
                    helperText={formError.title.message}
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
                    error={formError.description.error}
                    helperText={formError.description.message}
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
                        error={formError.subject.error}
                        helperText={formError.subject.message}
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
                        error={formError.price.error}
                        helperText={formError.price.message}
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
