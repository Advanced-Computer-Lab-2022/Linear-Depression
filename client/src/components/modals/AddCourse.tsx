import AddIcon from "@mui/icons-material/Add";
import LoadingButton from "@mui/lab/LoadingButton";
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    Box,
    FormControl,
    Button
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import { validateFormData } from "@internals/utils";

import { useFetchSubjects, useToast } from "@internals/hooks";
import { AddSubject } from "@internals/modals";
import { getMyCourses, getSubjects, useAppDispatch, useAppSelector } from "@internals/redux";
import { addCourse } from "@internals/services";

const AddCourse: React.FC = () => {
    const [formErrors, setFormErrors] = useState(new Map());
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    useFetchSubjects();
    const initialSubjects = useAppSelector((state) => state.subjects);

    const navigate = useNavigate();
    const closeModal = () => {
        navigate(-1);
    };

    const handleClose = () => {
        closeModal();
    };

    const validationRules = {
        title: Yup.string().required("Please enter a comment"),
        subject: Yup.string().required("Please select a subject"),
        description: Yup.string().required("Please enter a description"),
        price: Yup.number().min(0, "Price must be greater than 0")
    };

    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [subjects, setSubjects] = useState(initialSubjects.data ? initialSubjects.data : []);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const [openSubjectModal, setOpenSubjectModal] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        setFormErrors(new Map());
        const formData = {
            title,
            subject,
            description,
            price
        };
        validateFormData(formData, validationRules)
            .then(async (data) => {
                const validatedData = data as unknown as {
                    title: string;
                    subject: string;
                    description: string;
                    price: number;
                };

                const addedCourse = {
                    title: validatedData.title,
                    subject: validatedData.subject,
                    description: validatedData.description,
                    price: validatedData.price
                };

                addCourse(addedCourse)
                    .then(() => {
                        showToast({ message: "Course Added Successfully", type: "success" });
                        dispatch(getSubjects());
                        dispatch(getMyCourses(searchParams));
                        closeModal();
                    })
                    .catch(() => {
                        showToast({ message: "Failed to Add Course Try Later", type: "error" });
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

    const handleOpenSubjectModal = () => {
        setOpenSubjectModal(true);
    };

    const handleCloseSubjectModal = (data: string) => {
        setOpenSubjectModal(false);
        if (data) {
            const subject = data.toLowerCase();

            if (!subjects.includes(subject)) {
                setSubjects([...subjects, subject]);
            }
            setSubject(subject);
        }
    };

    return (
        <>
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
                    <Box
                        sx={{
                            minWidth: 120,
                            marginTop: 1
                        }}
                    >
                        <FormControl fullWidth>
                            <InputLabel required id="demo-simple-select-label">
                                Subject
                            </InputLabel>
                            <Select
                                required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={subject}
                                label="Subject"
                                placeholder="Subject"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                autoFocus
                                onChange={(e) => setSubject(e.target.value)}
                                error={formErrors.has("subject")}
                            >
                                <MenuItem
                                    onClick={handleOpenSubjectModal}
                                    sx={{
                                        color: "primary.main"
                                    }}
                                >
                                    <AddIcon
                                        sx={{
                                            width: 15,
                                            marginRight: 1
                                        }}
                                    />
                                    Add new Subject
                                </MenuItem>
                                {subjects.map((subject) => (
                                    <MenuItem value={subject}>{subject}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <TextField
                        required
                        sx={{
                            marginTop: 2
                        }}
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <LoadingButton loading={loading} onClick={handleSubmit}>
                        Submit
                    </LoadingButton>
                </DialogActions>
                <AddSubject open={openSubjectModal} onClose={handleCloseSubjectModal} />
            </Dialog>
        </>
    );
};

export default AddCourse;
