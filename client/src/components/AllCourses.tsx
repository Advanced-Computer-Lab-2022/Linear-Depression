import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { config } from "../config/config";
import { CountryContext } from "../context/CountryContext";
import { fetchCourses } from "../services/fetchCourses";
import { fetchSubjects } from "../services/fetchSubjects";
import CoursesWithFiltersPanel from "./CoursesWithFiltersPanel";

const AllCourses = () => {
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
        fetchCourses(searchParams).then((fetchedCoursesData) => {
            setCourses(fetchedCoursesData);
        });
        fetchSubjects().then((fetchedSubjectsData) => {
            setSubjects(fetchedSubjectsData);
        });
    }, [searchParams, country]);
    return (
        <div>
            <CoursesWithFiltersPanel courses={courses.data} subjects={subjects.data} />
        </div>
    );
};

export default AllCourses;
