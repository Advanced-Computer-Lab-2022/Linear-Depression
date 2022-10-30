import { StatusCodes } from "http-status-codes";
import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import AllCourses from "../components/AllCourses";
import MyCourses from "../components/MyCourses";
import { config } from "../config/config";
import { CountryContext } from "../context/CountryContext";
import { UserContext } from "../context/UserContext";
import { fetchCourses } from "../services/fetchCourses";
import { fetchSubjects } from "../services/fetchSubjects";
import { User } from "../types/User";

const Instructor: React.FC = () => {
    const [searchParams] = useSearchParams();

    const { country, setCountry } = useContext(CountryContext);
    const { userId, setUserId, userType, setUserType } = useContext(UserContext);

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

    setUserId("635ec64a0bd86009979f26a2");
    setUserType(User.INSTRUCTOR);

    useEffect(() => {
        fetch(`${config.API_URL}/country`, { credentials: "include" }).then((res) => {
            if (res.status === StatusCodes.OK) {
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
        <Routes>
            <Route path="/" element={<AllCourses />} />
            <Route path="/my-courses" element={<MyCourses id={userId} type={userType} />} />
        </Routes>
    );
};

export default Instructor;
