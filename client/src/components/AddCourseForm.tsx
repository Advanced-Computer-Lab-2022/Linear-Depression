import Button from "@mui/material/Button";
import { DialogContent, DialogContentText, TextField, DialogActions, Dialog } from "@mui/material";
import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import { FormProps } from "../types/FormProps";
import addCourse from "../services/addCourse";

const HorizontalView = styled.div`
    display: flex;
`;

const AddCourseForm: React.FC<FormProps> = ({ open, onClose }) => {
    const [title, setTitle] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState("");
    const { userId } = useContext(UserContext);

    const handleClose = () => {
        onClose("Close");
    };
    const handleSubmit = () => {
        addCourse({ title, subject, description, price, instructor: userId }).then(() => {
            onClose("submit");
        });
    };

    return (
        <Dialog open={open} onClose={handleClose}>
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

export default AddCourseForm;