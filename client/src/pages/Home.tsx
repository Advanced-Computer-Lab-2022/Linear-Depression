import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { config } from "../config/config";
import { CountryContext } from "../context/CountryContext";
import { useContext } from "react";
import AllCourses from "../components/AllCourses";
import { fetchCourses } from "../services/fetchCourses";
import { fetchSubjects } from "../services/fetchSubjects";
import { StatusCodes } from "http-status-codes";

const Home: React.FC = () => {
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

    return <AllCourses />;
};

export default Home;
