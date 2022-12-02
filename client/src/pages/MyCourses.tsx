import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { openModal } from "react-url-modal";

import { CoursesListWithFilters, FloatingButton } from "@internals/components";
import { useFetchMyCourses, useGetInstructorContractStatus } from "@internals/hooks";
import { useAppSelector } from "@internals/redux";

const MyCourses: React.FC = () => {
    useFetchMyCourses();
    useGetInstructorContractStatus();

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
