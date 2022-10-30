import Button from "@mui/material/Button";
import { DialogContent, DialogContentText, TextField, DialogActions, Dialog } from "@mui/material";
import React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import styled from "styled-components";

const HorizontalView = styled.div`
    display: flex;
`;

export interface AddCourseProps {
    open: boolean;
    onClose: (value: string) => void;
}

const AddCourseForm: React.FC<AddCourseProps> = ({ open, onClose }) => {
    const handleClose = () => {};
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We will send updates
                    occasionally.
                </DialogContentText>
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="subject"
                    label="Subject"
                    type="text"
                    fullWidth
                    variant="outlined"
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
                    rows={2}
                    maxRows={4}
                />
                <HorizontalView>
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="price"
                        label="Price"
                        type="number"
                        fullWidth
                        variant="outlined"
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
                    />
                </HorizontalView>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Subscribe</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddCourseForm;
