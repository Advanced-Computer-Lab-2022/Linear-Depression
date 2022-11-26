import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import AddLessonForm from "./instructorCourse/AddLessonForm";
import { CourseContent, FloatingButton } from "@internals/components";
import { useFetchCourseById } from "@internals/hooks";
import { useAppSelector } from "../../store";

const InstructorCourse: React.FC = () => {
    const { courseId } = useParams();
    useFetchCourseById(courseId);
    const { data } = useAppSelector((state) => state.course);

    const [open, setOpen] = useState(false);

    const onAddLessonClicked = () => {
        setOpen(true);
    };

    const onClose = (state: string) => {
        setOpen(false);
        if (state === "submit") {
            //updateCourse();
        }
    };

    return (
        <>
            {data != null && <CourseContent lessons={data.lessons} />}
            <FloatingButton onClick={onAddLessonClicked}>
                <AddIcon />
            </FloatingButton>
            <AddLessonForm open={open} onClose={onClose} />
        </>
    );
};

export default InstructorCourse;
