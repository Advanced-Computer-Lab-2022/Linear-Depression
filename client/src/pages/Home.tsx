import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import styled from "styled-components";
import Navbar from "../components/Navbar";
import axios from "axios";
import Filter from "../components/Filter";
import CheckBoxLists from "../components/CheckBoxLists";
import StarRating from "../components/StarRating";

const Temp = styled.div`
    color: red;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Home: React.FC = () => {
    const [subjects, setSubjects] = useState({
=======
import CoursesList from "../components/CoursesList";
import Navbar from "../components/Navbar";
import axios from "axios";

const Home: React.FC = () => {
    const [courses, setCourses] = useState({
>>>>>>> origin
        data: [],
        loading: true,
        error: null
    });

    useEffect(() => {
        axios
<<<<<<< HEAD
            .get("http://localhost:8080/courses/subjects")
            .then((res) => {
                console.log(res.data.subjects);
                setSubjects({
                    data: res.data.subjects,
=======
            .get("http://localhost:3000/courses")
            .then((res) => {
                console.log(res.data.courses);
                setCourses({
                    data: res.data.courses,
>>>>>>> origin
                    loading: false,
                    error: null
                });
            })
            .catch((err) => {
<<<<<<< HEAD
                setSubjects({
=======
                setCourses({
>>>>>>> origin
                    data: [],
                    loading: false,
                    error: err
                });
            });
    }, []);
<<<<<<< HEAD

    return (
        <div>
            {/* <Navbar /> */}
            <Filter
                titles={["Subject", "Price", "Rating"]}
                items={subjects.data}
                children={{ checkbox: CheckBoxLists, rating: StarRating }}
            />
=======
    return (
        <div>
            <Navbar />
            <CoursesList courses={courses.data} />
>>>>>>> origin
        </div>
    );
};

export default Home;
