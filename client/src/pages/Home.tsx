import React, { useEffect, useState } from "react";
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
        data: [],
        loading: true,
        error: null
    });

    useEffect(() => {
        axios
            .get("http://localhost:8080/courses/subjects")
            .then((res) => {
                console.log(res.data.subjects);
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
    }, []);

    return (
        <div>
            {/* <Navbar /> */}
            <Filter
                titles={["Subject", "Price", "Rating"]}
                items={subjects.data}
                children={{ checkbox: CheckBoxLists, rating: StarRating }}
            />
        </div>
    );
};

export default Home;
