import { Fab } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { config } from "../config/config";
import { CountryContext } from "../context/CountryContext";
import { fetchCourses } from "../services/fetchCourses";
import { fetchSubjects } from "../services/fetchSubjects";
import { User } from "../types/User";
import CoursesWithFiltersPanel from "./CoursesWithFiltersPanel";
import AddIcon from "@mui/icons-material/Add";
import AddCourseForm from "./AddCourseForm";

const MyCourses: React.FC<{
    id: string;
    type: User;
}> = ({ id, type }) => {
    const [searchParams] = useSearchParams();

    const { country, setCountry } = useContext(CountryContext);
    const [courses, setCourses] = useState({
        data: [],
        loading: true,
        error: null
    });
    const [subjects, setSubjects] = useState({
        data: [],
        loading: true,
        error: null
    });
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetch(`${config.API_URL}/country`, { credentials: "include" }).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setCountry(data.language);
                });
            }
        });
    }, []);

    useEffect(() => {
        fetchCourses(searchParams, id, type).then((fetchedCoursesData) => {
            setCourses(fetchedCoursesData);
        });
        fetchSubjects().then((fetchedSubjectsData) => {
            setSubjects(fetchedSubjectsData);
        });
    }, [searchParams, country]);
    return (
        <div>
            <CoursesWithFiltersPanel courses={courses.data} subjects={subjects.data} addCourse={true} />
            <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <AddCourseForm open={open} onClose={handleClose} />
        </div>
    );
};

export default MyCourses;
