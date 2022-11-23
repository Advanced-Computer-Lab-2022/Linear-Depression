import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { CountryContext } from "../context/CountryContext";
import fetchMyCourses from "../services/fetchMyCourses";

const useFetchMyCourses = () => {
    const [searchParams] = useSearchParams();
    const { country } = useContext(CountryContext);
    const [courses, setCourses] = useState({
        data: [],
        loading: false,
        error: null
    });

    const fetchAndSetCourses = () => {
        setCourses({ data: [], loading: true, error: null });
        fetchMyCourses(searchParams)
            .then((data) => {
                setCourses({ data: data, loading: false, error: null });
            })
            .catch((err) => {
                setCourses({ data: [], loading: false, error: err });
            });
    };

    useEffect(() => {
        fetchAndSetCourses();
    }, [searchParams, country]);

    return { courses, updateCourses: fetchAndSetCourses };
};

export default useFetchMyCourses;
