import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import AddLessonForm from "./instructorCourse/AddLessonForm";
import { CourseContent, FloatingButton } from "@internals/components";
import { useFetchCourseById } from "@internals/hooks";

const InstructorCourse: React.FC = () => {
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

export default InstructorCourse;
