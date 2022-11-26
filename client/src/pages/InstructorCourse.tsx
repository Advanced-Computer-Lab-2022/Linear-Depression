import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { useParams } from "react-router-dom";
import { openModal } from "react-url-modal";

import { CourseContent, CourseHeader, FloatingButton } from "@internals/components";
import { useFetchCourseById } from "@internals/hooks";

const InstructorCourse: React.FC = () => {
    const { courseId } = useParams();
    const { course } = useFetchCourseById(courseId);

    const onClick = () => {
        openModal({
            name: "addLesson",
            params: {
                courseId
            }
        });
    };

    // TODO: To be replaced with suspense
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
            <FloatingButton onClick={onClick}>
                <AddIcon />
            </FloatingButton>
        </>
    );
};

export default InstructorCourse;
