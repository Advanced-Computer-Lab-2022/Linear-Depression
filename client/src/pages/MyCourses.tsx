import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { openModal } from "react-url-modal";

import { useAppSelector } from "../store";
import { CoursesListWithFilters, FloatingButton } from "@internals/components";
import { useFetchMyCourses } from "@internals/hooks";

const MyCourses: React.FC = () => {
    useFetchMyCourses();
    const { data, loading } = useAppSelector((state) => state.coursesList);

    const onClick = () => {
        openModal({
            name: "addCourse"
        });
    };

    return (
        <div>
            {!loading && <CoursesListWithFilters courses={data} addCourse={true} />}
            <FloatingButton color="primary" aria-label="add" onClick={onClick}>
                <AddIcon />
            </FloatingButton>
        </div>
    );
};

export default MyCourses;
