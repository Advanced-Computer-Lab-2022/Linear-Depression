import { Dialog, DialogContent, DialogContentText, DialogActions, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector, getCourse } from "@internals/redux";
import { editCourse } from "@internals/services";
import * as Yup from "yup";
import { validateFormData } from "@internals/utils";
import { useToast } from "@internals/hooks";

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
    const [preview, setPreview] = useState(data.preview ? data.preview : "");

    const [formErrors, setFormErrors] = useState(new Map());
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    const validationRules = {
        title: Yup.string().required("Please enter a title"),
        subject: Yup.string().required("Please select a subject"),
        description: Yup.string().required("Please enter a description"),
        price: Yup.number().min(0, "Price must be greater than 0"),

        // youtube video url validation
        preview: Yup.string().matches(
            /^(http(s)?:\/\/)?((w){3}.)?youtube\.com\/watch\?v=/,
            "Please enter a valid youtube video url"
        )
    };

    const dispatch = useAppDispatch();
    const handleSubmit = () => {
        setLoading(true);
        const formData = {
            title,
            subject,
            description,
            price,
            preview: preview.length > 0 ? preview : undefined
        };

        validateFormData(formData, validationRules)
            .then(async (outputData) => {
                const validatedData = outputData as unknown as {
                    title: string;
                    subject: string;
                    description: string;
                    price: number;
                    preview?: string;
                };

                const addedCourse: {
                    title: string;
                    subject: string;
                    description: string;
                    price: number;
                    preview?: string;
                } = {
                    title: validatedData.title,
                    subject: validatedData.subject,
                    description: validatedData.description,
                    price: validatedData.price
                };

                if (validatedData.preview) {
                    addedCourse.preview = validatedData.preview;
                }

                editCourse(data._id, addedCourse)
                    .then(() => {
                        showToast({ message: "Course Updated Successfully", type: "success" });
                        dispatch(getCourse(data._id));
                        closeModal();
                    })
                    .catch(() => {
                        showToast({ message: "Failed to Update Course Try Later", type: "error" });
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
                    error={formErrors.has("title")}
                    helperText={formErrors.get("title")}
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
                    error={formErrors.has("description")}
                    helperText={formErrors.get("description")}
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
                    error={formErrors.has("preview")}
                    helperText={formErrors.get("preview")}
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
                        error={formErrors.has("price")}
                        helperText={formErrors.get("price")}
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

export default EditCourse;
