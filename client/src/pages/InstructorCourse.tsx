import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { useParams } from "react-router-dom";
import { openModal } from "react-url-modal";

import { CourseContent, CourseHeader, FloatingButton } from "@internals/components";
import { useFetchCourseById } from "@internals/hooks";
import { useAppSelector } from "@internals/store";

const InstructorCourse: React.FC = () => {
    const { courseId } = useParams();
    useFetchCourseById(courseId);
    const { data } = useAppSelector((state) => state.course);

    const onClick = () => {
        openModal({
            name: "addLesson",
            params: {
                courseId
            }
        });
    };

    // TODO: To be replaced with suspense
    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <CourseHeader
                title={data.title}
                description={data.description}
                rating={data.averageRating}
                instructor={data.instructor.firstName + " " + data.instructor.lastName}
                price={data.price}
                currency={data.currency}
                promotion={data.promotion}
            />
            <CourseContent lessons={data.lessons} />
            <FloatingButton onClick={onClick}>
                <AddIcon />
            </FloatingButton>
        </>
    );
};

export default InstructorCourse;
