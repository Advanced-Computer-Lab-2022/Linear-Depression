import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { CountryContext } from "@internals/contexts";
import { fetchAllCourses } from "@internals/services";

const useFetchAllCourses = () => {
    const [searchParams] = useSearchParams();
    const { country } = useContext(CountryContext);
    const [courses, setCourses] = useState({
        data: [],
        loading: false,
        error: null
    });

    useEffect(() => {
        setCourses({ data: [], loading: true, error: null });
        fetchAllCourses(searchParams)
            .then((data) => {
                setCourses({ data: data, loading: false, error: null });
            })
            .catch((err) => {
                setCourses({ data: [], loading: false, error: err });
            });
    }, [searchParams, country]);

    return courses;
};

export default useFetchAllCourses;
