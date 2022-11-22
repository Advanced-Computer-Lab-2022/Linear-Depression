import { useEffect, useState } from "react";
import fetchCourseById from "../services/fetchCourseById";

const useFetchCourseById = (id: string) => {
    const [course, setCourse] = useState({
        data: null,
        loading: false,
        error: null
    });

    const fetchAndSetCourse = () => {
        setCourse({ data: null, loading: true, error: null });
        fetchCourseById(id)
            .then((data) => {
                setCourse({ data: data, loading: false, error: null });
            })
            .catch((err) => {
                setCourse({ data: null, loading: false, error: err });
            });
    };

    useEffect(() => {
        fetchAndSetCourse();
    }, []);

    return { course, updateCourse: fetchAndSetCourse };
};

export default useFetchCourseById;
