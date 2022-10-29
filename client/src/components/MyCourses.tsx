import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { config } from "../config/config";
import { CountryContext } from "../context/CountryContext";
import { constructFilterURL } from "../services/constructFilterURL";
import { fetchCourses } from "../services/fetchCourses";
import { fetchSubjects } from "../services/fetchSubjects";
import { User } from "../types/User";
import CoursesWithFiltersPanel from "./CoursesWithFiltersPanel";

const MyCourses: React.FC<{
    id: string;
    type: User;
}> = ({ id, type }) => {
    const [searchParams, setSearchParams] = useSearchParams();

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

    //get request using fetch
    useEffect(() => {
        fetch(`${config.API_URL}/country`, { credentials: "include" }).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    console.log(data.language);
                    setCountry(data.language);
                });
            }
        });
    }, []);

    useEffect(() => {
        setSearchParams({ instructor: id });
        fetchCourses(searchParams, id, type).then((fetchedCoursesData) => {
            console.log("Hereeeeee");
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

export default MyCourses;
