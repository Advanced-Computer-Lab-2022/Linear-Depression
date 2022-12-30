import LoadingButton from "@mui/lab/LoadingButton";
import { Dialog, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import Button from "@mui/material/Button";
import { deleteLesson } from "@internals/services";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@internals/hooks";
import { useAppDispatch, getCourse } from "@internals/redux";

const DeleteCourse: React.FC<{
    params: {
        courseId: string;
        lessonId: string;
    };
}> = ({ params }) => {
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const { courseId, lessonId } = params;
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
        deleteLesson(courseId, lessonId)
            .then(() => {
                setLoading(false);
                dispatch(getCourse(courseId));
                showToast({ message: "Lesson deleted successfully", type: "success" });
                closeModal();
            })
            .catch(() => {
                setLoading(false);
                showToast({ message: "Failed to delete Lesson", type: "error" });
                closeModal();
            });
    };

    return (
        <>
            <Dialog open={true}>
                <DialogContent>
                    <DialogContentText>Delete Lesson</DialogContentText>
                    <br />
                    <DialogContentText>Are you sure you want to delete this lesson?</DialogContentText>
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

export default DeleteCourse;
