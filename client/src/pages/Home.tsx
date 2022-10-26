import React, { useEffect, useState } from "react";
import CoursesList from "../components/CoursesList";
import Navbar from "../components/Navbar";
import axios from "axios";

const Home: React.FC = () => {
    const [courses, setCourses] = useState({
        data: [],
        loading: true,
        error: null
    });

    useEffect(() => {
        axios
            .get("http://localhost:3000/courses")
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
    }, []);
    return (
        <div>
            <Navbar />
            <CoursesList courses={courses.data} />
        </div>
    );
};

export default Home;
