import { Dialog, DialogContent, DialogContentText, TextField, DialogActions } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import addLesson from "../../../services/addLesson";
import { FormProps } from "../../../types/FormProps";

const AddLessonForm: React.FC<FormProps> = ({ open, onClose }) => {
    const [title, setTitle] = useState("");
    const [totalHours, setTotalHours] = useState(0);

    const { courseId } = useParams();

    const handleClose = () => {
        onClose("Close");
    };

    const handleSubmit = () => {
        addLesson(courseId, { title, totalHours }).then(() => {
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
                    onChange={(e) => setTotalHours(e.target.value as unknown as number)}
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
