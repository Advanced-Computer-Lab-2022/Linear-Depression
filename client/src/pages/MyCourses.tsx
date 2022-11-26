import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { openModal } from "react-url-modal";

import { CoursesListWithFilters, FloatingButton } from "@internals/components";
import { useFetchMyCourses } from "@internals/hooks";

const MyCourses: React.FC = () => {
    const { courses } = useFetchMyCourses();

    const onClick = () => {
        openModal({
            name: "addCourse"
        });
    };

    return (
        <div>
            <CoursesListWithFilters courses={courses.data} addCourse={true} />
            <FloatingButton color="primary" aria-label="add" onClick={onClick}>
                <AddIcon />
            </FloatingButton>
        </div>
    );
};

export default MyCourses;
