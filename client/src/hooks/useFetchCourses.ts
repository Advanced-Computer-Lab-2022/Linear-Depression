import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { CountryContext } from "../context/CountryContext";
import { config } from "../config/config";
import axios from "axios";

const useFetchCourses = () => {
    const [searchParams] = useSearchParams();
    const { country } = useContext(CountryContext);
    const [courses, setCourses] = useState({
        data: [],
        loading: false,
        error: null
    });

    useEffect(() => {
        setCourses({ data: [], loading: true, error: null });
        fetchCourses(searchParams)
            .then((data) => {
                setCourses({ data: data, loading: false, error: null });
            })
            .catch((err) => {
                setCourses({ data: [], loading: false, error: err });
            });
    }, [searchParams, country]);

    return courses;
};

const fetchCourses = (searchParams: URLSearchParams): Promise<never[]> => {
    const FILTERS = searchParams.toString();
    const API_URL = `${config.API_URL}/courses?${FILTERS}`;
    return new Promise((resolve, reject) => {
        axios
            .get(API_URL, {
                withCredentials: true
            })
            .then((res) => {
                resolve(res.data.courses);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default useFetchCourses;
