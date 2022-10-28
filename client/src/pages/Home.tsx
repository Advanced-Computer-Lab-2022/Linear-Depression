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
    //get request using fetch
    useEffect(() => {
        fetch(`http://localhost:3000/country`, { credentials: "include" }).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    console.log(data.language);
                    setCountry(data.language);
                });
            }
        });
    }, []);

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
