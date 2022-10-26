import React, { useEffect, useState } from "react";
import CoursesList from "../components/CoursesList";
import Navbar from "../components/Navbar";
import axios from "axios";
import { CountryContext } from "../context/CountryContext";
import { useContext } from "react";

const Home: React.FC = () => {
    const { country, setCountry } = useContext(CountryContext);
    const [courses, setCourses] = useState({
        data: [],
        loading: true,
        error: null
    });

    useEffect(() => {
        axios
            .get("http://localhost:3000/courses", {
                withCredentials: true
            })
            .then((res) => {
                console.log(res.data.courses);
                setCourses({
                    data: res.data.courses,
                    loading: false,
                    error: null
                });
            })
            .catch((err) => {
                setCourses({
                    data: [],
                    loading: false,
                    error: err
                });
            });
    }, [country]);
    return (
        <div>
            <Navbar />
            <CoursesList courses={courses.data} />
        </div>
    );
};

export default Home;
