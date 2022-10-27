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

const CoursesContainer = styled.div`
    display: flex;
`;

const Home: React.FC = () => {
    const [searchParams] = useSearchParams();

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

    useEffect(() => {
        axios
            .get(constructFilterURL())
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
    }, [searchParams]);

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
