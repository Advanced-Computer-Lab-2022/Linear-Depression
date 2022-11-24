import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import AddLessonForm from "./instructorCourse/AddLessonForm";
import { CourseContent, CourseHeader, FloatingButton } from "@internals/components";
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

    if (!course.data) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <CourseHeader
                title={course.data.title}
                description={course.data.description}
                rating={course.data.averageRating}
                instructor={course.data.instructor.firstName + " " + course.data.instructor.lastName}
                price={course.data.price}
                currency={course.data.currency}
                promotion={course.data.promotion}
            />
            <CourseContent lessons={course.data.lessons} />
            <FloatingButton onClick={onAddLessonClicked}>
                <AddIcon />
            </FloatingButton>
            <AddLessonForm open={open} onClose={onClose} />
        </>
    );
};

export default InstructorCourse;
