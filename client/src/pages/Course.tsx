import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchCourseById from "../hooks/useFetchCourseById";
import CourseContent from "../components/CourseContent/CourseContent";
import AddIcon from "@mui/icons-material/Add";
import AddLessonForm from "../components/AddLessonForm";
import FloatingButton from "../components/StyledComponents/FloatingButton";

const Course: React.FC = () => {
    const { courseId } = useParams();
    const { course, updateCourse } = useFetchCourseById(courseId);

    const [open, setOpen] = useState(false);

    const onAddLessonClicked = () => {
        setOpen(true);
    };

    const onClose = (state: string) => {
        setOpen(false);
        if (state === "submit") {
            updateCourse();
        }
    };

    return (
        <>
            {course.data != null && <CourseContent lessons={course.data.lessons} />}
            <FloatingButton onClick={onAddLessonClicked}>
                <AddIcon />
            </FloatingButton>
            <AddLessonForm open={open} onClose={onClose} />
        </>
    );
};

export default Course;
