import Button from "@mui/material/Button";
import { DialogContent, DialogContentText, TextField, DialogActions, Dialog } from "@mui/material";
import React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import styled from "styled-components";
import Instructor from "../pages/Instructor";
import { config } from "../config/config";
import { useNavigate } from "react-router-dom";

const HorizontalView = styled.div`
    display: flex;
`;

export interface AddCourseProps {
    open: boolean;
    onClose: (value: string) => void;
}

const AddCourseForm: React.FC<AddCourseProps> = ({ open, onClose }) => {
    const [title, setTitle] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState("");
    const navigate = useNavigate();
    const handleClose = () => {};
    const handleSubmit = () => {
        const request = {
            title: title,
            subject: subject,
            description: description,
            price: price,
            instructor: "63595d451adfd7849591624a"
        };
        fetch(config.API_URL + "/courses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(request)
        })
            .then((r) => r.json())
            .then((data) => {
                console.log(data);
            });

        onClose("submit");
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
