import LoadingButton from "@mui/lab/LoadingButton";
import { Dialog, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import Button from "@mui/material/Button";
import { useAppSelector } from "@internals/redux";
import { deleteCourse } from "@internals/services";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@internals/hooks";

const DeleteCourse: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(true);
    const course = useAppSelector((state) => state.course);
    const { showToast } = useToast();

    const navigate = useNavigate();
    const closeModal = () => {
        navigate(-1);
    };

    const handleClose = () => {
        closeModal();
    };

    const handleSubmit = () => {
        setLoading(true);
        deleteCourse(course.data?._id)
            .then(() => {
                setLoading(false);
                showToast({ message: "Course deleted successfully", type: "success" });
                setOpen(false);
                navigate("/me/courses");
            })
            .catch(() => {
                setLoading(false);
                showToast({ message: "Failed to delete Course", type: "error" });
                closeModal();
            });
    };

    return (
        <>
            <Dialog open={open}>
                <DialogContent>
                    <DialogContentText>Delete Course</DialogContentText>
                    <br />
                    <DialogContentText>Are you sure you want to delete this course?</DialogContentText>
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
