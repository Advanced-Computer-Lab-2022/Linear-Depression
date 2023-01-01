import LoadingButton from "@mui/lab/LoadingButton";
import { Dialog, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import Button from "@mui/material/Button";
import { deleteExercise } from "@internals/services";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@internals/hooks";
import { useAppDispatch, getCourse } from "@internals/redux";

const DeleteExercise: React.FC<{
    params: {
        courseId: string;
        lessonId: string;
        exerciseId: string;
    };
}> = ({ params }) => {
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const { courseId, lessonId, exerciseId } = params;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const closeModal = () => {
        navigate(-1);
    };

    const handleClose = () => {
        closeModal();
    };

    const handleSubmit = () => {
        setLoading(true);
        deleteExercise(courseId, lessonId, exerciseId)
            .then(() => {
                setLoading(false);
                dispatch(getCourse(courseId));
                showToast({ message: "Exercise deleted successfully", type: "success" });
                closeModal();
            })
            .catch(() => {
                setLoading(false);
                showToast({ message: "Failed to delete Exercise", type: "error" });
                closeModal();
            });
    };

    return (
        <>
            <Dialog open={true}>
                <DialogContent>
                    <DialogContentText>Delete Exercise</DialogContentText>
                    <br />
                    <DialogContentText>Are you sure you want to delete this Exercise?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <LoadingButton loading={loading} onClick={handleSubmit} sx={{ color: "red" }}>
                        Delete
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteExercise;
