import React, { useState } from "react";
import CoursesListWithFilters from "../../components/CoursesListWithFilters";
import AddIcon from "@mui/icons-material/Add";
import AddCourseForm from "../../components/AddCourseForm";
import FloatingButton from "../../components/StyledComponents/FloatingButton";
import useFetchMyCourses from "../../hooks/useFetchMyCourses";

const MyCourses: React.FC = () => {
    const { courses, updateCourses } = useFetchMyCourses();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (state: string) => {
        setOpen(false);
        if (state === "submit") {
            updateCourses();
        }
    };

    return (
        <div>
            <CoursesListWithFilters courses={courses.data} addCourse={true} />
            <FloatingButton color="primary" aria-label="add" onClick={handleClickOpen}>
                <AddIcon />
            </FloatingButton>
            <AddCourseForm open={open} onClose={handleClose} />
        </div>
    );
};

export default MyCourses;
