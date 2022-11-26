import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";

import AddCourseForm from "./myCourses/AddCourseForm";
import { CoursesListWithFilters, FloatingButton } from "@internals/components";
import { useFetchMyCourses } from "@internals/hooks";
import { useAppSelector } from "../store";

const MyCourses: React.FC = () => {
    const { data, loading } = useAppSelector((state) => state.coursesList);
    useFetchMyCourses();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (state: string) => {
        setOpen(false);
        if (state === "submit") {
            //updateCourses();
        }
    };

    return (
        <div>
            {!loading && <CoursesListWithFilters courses={data} addCourse={true} />}
            <FloatingButton color="primary" aria-label="add" onClick={handleClickOpen}>
                <AddIcon />
            </FloatingButton>
            <AddCourseForm open={open} onClose={handleClose} />
        </div>
    );
};

export default MyCourses;
