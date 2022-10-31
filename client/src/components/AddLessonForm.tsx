import { Dialog, DialogContent, DialogContentText, TextField, DialogActions } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import { useParams } from "react-router-dom";
import { config } from "../config/config";
import { FormProps } from "../types/FormProps";

const AddLessonForm: React.FC<FormProps> = ({ open, onClose }) => {
    const [title, setTitle] = React.useState("");
    const [totalHours, setTotalHours] = React.useState("");

    const courseId = useParams().courseId;

    const handleClose = () => {
        onClose("Close");
    };

    const handleSubmit = () => {
        const request = {
            title: title,
            totalHours: totalHours
        };
        fetch(config.API_URL + `/courses/${courseId}/add-lesson`, {
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
                onClose("submit");
            });
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <DialogContentText>Add a new Lesson</DialogContentText>
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
                    label="Duration"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={totalHours}
                    onChange={(e) => setTotalHours(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddLessonForm;
