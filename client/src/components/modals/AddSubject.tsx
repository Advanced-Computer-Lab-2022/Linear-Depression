import { Dialog, DialogContent, DialogContentText, DialogActions, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";

const AddSubject: React.FC<{
    open: boolean;
    onClose: (data: string) => void;
}> = ({ open, onClose }) => {
    const [subject, setSubject] = useState("");

    const handleClose = () => {
        onClose(null);
    };

    const handleSubmit = () => {
        onClose(subject);
    };

    return (
        <Dialog open={open}>
            <DialogContent>
                <DialogContentText>Add a new Subject</DialogContentText>
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="subject"
                    label="Subject"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={subject}
                    maxRows={1}
                    onChange={(e) => setSubject(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddSubject;
