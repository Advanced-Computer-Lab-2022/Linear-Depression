import { Dialog, DialogContent, DialogContentText, DialogActions, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddExercise: React.FC<{
    courseId: string;
    lessonId: string;
    open: boolean;
    onClose: () => void;
}> = ({ courseId, lessonId, open, onClose }) => {
    const navigate = useNavigate();

    const handleClose = () => {
        onClose();
    };

    const [title, setTitle] = useState("");

    const handleSubmit = () => {
        navigate(`/courses/${courseId}/lessons/${lessonId}/exercise`, { state: { title: title } });
    };

    return (
        <Dialog open={open}>
            <DialogContent>
                <DialogContentText>Add a new Exercise</DialogContentText>
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
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Proceed</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddExercise;
