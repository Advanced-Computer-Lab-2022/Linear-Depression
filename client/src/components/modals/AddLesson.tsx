import { Dialog, DialogContent, DialogContentText, DialogActions, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addLesson } from "@internals/services";

const AddLesson: React.FC<{
    params: {
        courseId: string;
    };
}> = ({ params }) => {
    const navigate = useNavigate();
    const closeModal = () => {
        navigate(-1);
    };

    const { courseId } = params;

    const handleClose = () => {
        closeModal();
    };

    const [title, setTitle] = useState("");
    const [totalHours, setTotalHours] = useState(0);

    const handleSubmit = () => {
        addLesson(courseId, { title, totalHours }).then(() => {
            closeModal();
            // TODO: refresh the page on submit to show the new lesson (Redux)
        });
    };

    return (
        <Dialog open={true}>
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

export default AddLesson;
