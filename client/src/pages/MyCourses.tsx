import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { openModal } from "react-url-modal";

import { CoursesListWithFilters, FloatingButton, Navbar } from "@internals/components";
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
        <>
            <Navbar />
            {!loading && <CoursesListWithFilters courses={data} addCourse={true} />}
            <FloatingButton color="primary" aria-label="add" onClick={onClick}>
                <AddIcon />
            </FloatingButton>
        </>
    );
};

export default MyCourses;
