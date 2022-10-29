import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Filter from "../components/Filter";
import CheckBoxLists from "../components/CheckBoxLists";
import StarRating from "../components/StarRating";
import CoursesList from "../components/CoursesList";
import Navbar from "../components/Navbar";
import axios from "axios";
import { config } from "../config/config";
import { CountryContext } from "../context/CountryContext";
import { useContext } from "react";

const CoursesContainer = styled.div`
    display: flex;
`;

const Home: React.FC = () => {
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

    const constructFilterURL = () => {
        let apiURL = `${config.API_URL}/courses`;
        const params = searchParams.toString();
        if (params.length > 0) {
            apiURL += `?${params}`;
        }
        return apiURL;
    };

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
        axios
            .get(constructFilterURL(), {
                withCredentials: true
            })
            .then((res) => {
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
        axios
            .get(`${config.API_URL}/courses/subjects`)
            .then((res) => {
                setSubjects({
                    data: res.data.subjects,
                    loading: false,
                    error: null
                });
            })
            .catch((err) => {
                setSubjects({
                    data: [],
                    loading: false,
                    error: err
                });
            });
    }, [searchParams, country]);

    return (
        <div>
            <Navbar />
            <CoursesContainer>
                <Filter
                    titles={["Subject", "Price", "Rating"]}
                    items={subjects.data}
                    children={{ checkbox: CheckBoxLists, rating: StarRating }}
                />
                <CoursesList courses={courses.data} />
            </CoursesContainer>
        </div>
    );
};

export default Home;
