import { Dialog, DialogContent, DialogContentText, DialogActions, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import IQuestionProps from "src/types/Question";

const AddQuestion: React.FC<{
    open: boolean;
    onClose: (data: IQuestionProps | null) => void;
}> = ({ open, onClose }) => {
    const clearData = () => {
        setQuestion("");
        setChoices(["", "", "", ""]);
    };

    const handleClose = () => {
        clearData();
        onClose(null);
    };

    const [question, setQuestion] = useState("");
    const [choices, setChoices] = useState(["", "", "", ""]);

    const handleSubmit = () => {
        const data: IQuestionProps = {
            question,
            choices
        };

        clearData();
        onClose(data);
    };

    return (
        <Dialog open={open}>
            <DialogContent>
                <DialogContentText>Add a new Question</DialogContentText>
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="question"
                    label="Question"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={question}
                    multiline
                    minRows={1}
                    maxRows={4}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                {choices.map((choice, index) => (
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id={`choice-${index}`}
                        label={`Choice ${index + 1}`}
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={choice}
                        multiline
                        minRows={1}
                        maxRows={2}
                        onChange={(e) => {
                            const newChoices = [...choices];
                            newChoices[index] = e.target.value;
                            setChoices(newChoices);
                        }}
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Proceed</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddQuestion;
