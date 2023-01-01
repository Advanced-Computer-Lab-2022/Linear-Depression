import { Dialog, DialogContent, DialogContentText, DialogActions, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";

const EditExerciseTitle: React.FC<{
    open: boolean;
    onClose: (data: string | null) => void;
    titleToEdit: string;
}> = ({ open, onClose, titleToEdit }) => {
    const handleClose = () => {
        onClose(null);
    };

    const [title, setTitle] = useState(titleToEdit);
    const [error, setError] = useState(false);

    const handleSubmit = () => {
        if (title === "") {
            setError(true);
            return;
        }
        onClose(title);
    };

    return (
        <Dialog open={open}>
            <DialogContent sx={{ width: "600px" }}>
                <DialogContentText>Edit Exercise Title</DialogContentText>
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
                    error={error}
                    helperText={error ? "Title is required" : ""}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Proceed</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditExerciseTitle;
