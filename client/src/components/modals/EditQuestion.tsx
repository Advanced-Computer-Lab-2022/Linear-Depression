import { Dialog, DialogContent, DialogContentText, DialogActions, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import IQuestionProps from "src/types/Question";
import * as Yup from "yup";
import { validateFormData } from "@internals/utils";
import LoadingButton from "@mui/lab/LoadingButton";

const EditQuestion: React.FC<{
    open: boolean;
    onClose: (data: IQuestionProps | null) => void;
    questionToEdit?: IQuestionProps;
}> = ({ open, onClose, questionToEdit }) => {
    const clearData = () => {
        setQuestion("");
        setChoices(["", "", "", ""]);
    };

    const handleClose = () => {
        clearData();
        onClose(null);
    };

    const [question, setQuestion] = useState(questionToEdit?.question || "");
    const [choices, setChoices] = useState(questionToEdit?.choices || ["", "", "", ""]);
    const [formErrors, setFormErrors] = useState(new Map());
    const [loading, setLoading] = useState(false);

    const validationRules = {
        question: Yup.string().required("Please enter a question"),
        choice_0: Yup.string().required("Please enter a choice"),
        choice_1: Yup.string().required("Please enter a choice"),
        choice_2: Yup.string().required("Please enter a choice"),
        choice_3: Yup.string().required("Please enter a choice")
    };

    const handleSubmit = () => {
        setLoading(true);
        setFormErrors(new Map());
        const formData = {
            question,
            choice_0: choices[0],
            choice_1: choices[1],
            choice_2: choices[2],
            choice_3: choices[3]
        };

        validateFormData(formData, validationRules)
            .then((data) => {
                console.log("heere");
                const validatedData = data as unknown as {
                    question: string;
                    choice_0: string;
                    choice_1: string;
                    choice_2: string;
                    choice_3: string;
                };

                const dataToSend: IQuestionProps = {
                    question: validatedData.question,
                    choices: [
                        validatedData.choice_0,
                        validatedData.choice_1,
                        validatedData.choice_2,
                        validatedData.choice_3
                    ]
                };
                clearData();
                setLoading(false);
                onClose(dataToSend);
            })
            .catch((errors) => {
                console.log(errors);
                setFormErrors(errors);
                setLoading(false);
            });
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
                    error={formErrors.has("question")}
                    helperText={formErrors.get("question")}
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
                        error={formErrors.has(`choice_${index}`)}
                        helperText={formErrors.get(`choice_${index}`)}
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <LoadingButton loading={loading} onClick={handleSubmit}>
                    Proceed
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default EditQuestion;
