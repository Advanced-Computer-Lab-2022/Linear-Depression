import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CourseContent from "../components/CourseContent/CourseContent";
import { config } from "../config/config";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import AddLessonForm from "../components/AddLessonForm";

const Course: React.FC = () => {
    const [lessons, setLessons] = useState({
        data: [],
        loading: true,
        error: null
    });
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const courseId = useParams().courseId;
    useEffect(() => {
        axios
            .get(`${config.API_URL}/courses/${courseId}`)
            .then((response) => {
                setLessons({
                    data: response.data.course.lessons,
                    loading: false,
                    error: null
                });
            })
            .catch((error) => {
                setLessons({
                    data: [],
                    loading: false,
                    error: error
                });
            });
    }, [open]);

    return (
        <>
            <CourseContent lessons={lessons.data} />
            <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <AddLessonForm open={open} onClose={handleClose} />
        </>
    );
};

export default Course;
