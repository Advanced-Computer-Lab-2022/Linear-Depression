import AddIcon from "@mui/icons-material/Add";
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

import { useFetchSubjects } from "@internals/hooks";
import { AddSubject } from "@internals/modals";
import { getMyCourses, getSubjects, useAppDispatch, useAppSelector } from "@internals/redux";
import { addCourse } from "@internals/services";

const AddCourse: React.FC = () => {
    useFetchSubjects();
    const subjects = useAppSelector((state) => state.subjects);

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
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const [openSubjectModal, setOpenSubjectModal] = useState(false);

    const handleSubmit = () => {
        addCourse({ title, subject, description, price }).then(() => {
            dispatch(getSubjects());
            dispatch(getMyCourses(searchParams));
            closeModal();
        });
    };

    const handleOpenSubjectModal = () => {
        setOpenSubjectModal(true);
    };

    const handleCloseSubjectModal = (data: string) => {
        setOpenSubjectModal(false);
        if (data) {
            setSubject(data);
            document.getElementById("demo-simple-select").innerText = data;
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
                                {subjects.data?.map((subject) => (
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
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
                <AddSubject open={openSubjectModal} onClose={handleCloseSubjectModal} />
            </Dialog>
        </>
    );
};

export default AddCourse;
