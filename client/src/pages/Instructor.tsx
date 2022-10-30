import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import AllCourses from "../components/AllCourses";
import MyCourses from "../components/MyCourses";
import { config } from "../config/config";
import { CountryContext } from "../context/CountryContext";
import { fetchCourses } from "../services/fetchCourses";
import { fetchSubjects } from "../services/fetchSubjects";
import { User } from "../types/User";

const Instructor: React.FC = () => {
    const [searchParams] = useSearchParams();

    const { country, setCountry } = useContext(CountryContext);
    const [, setCourses] = useState({
        data: [],
        loading: true,
        error: null
    });
    const [, setSubjects] = useState({
        data: [],
        loading: true,
        error: null
    });

    const instructorId = "63595d451adfd7849591624a";

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
        fetchCourses(searchParams).then((fetchedCoursesData) => {
            setCourses(fetchedCoursesData);
        });
        fetchSubjects().then((fetchedSubjectsData) => {
            setSubjects(fetchedSubjectsData);
        });
    }, [searchParams, country]);
    return (
        <Routes>
            <Route path="/" element={<AllCourses />} />
            <Route path="/my-courses" element={<MyCourses id={instructorId} type={User.INSTRUCTOR} />} />
        </Routes>
    );
};

export default Instructor;
