import axios from "axios";
import { useEffect, useState } from "react";
import { config } from "../config/config";

const useFetchSubjects = () => {
    const [subjects, setSubjects] = useState({
        data: [],
        loading: false,
        error: null
    });

    useEffect(() => {
        setSubjects({ data: [], loading: true, error: null });
        fetchSubjects()
            .then((data) => {
                setSubjects({ data: data, loading: false, error: null });
            })
            .catch((err) => {
                setSubjects({ data: [], loading: false, error: err });
            });
    }, []);
    return subjects;
};

const fetchSubjects = (): Promise<never[]> => {
    const API_URL = `${config.API_URL}/courses/subjects`;
    return new Promise((resolve, reject) => {
        axios
            .get(API_URL)
            .then((res) => {
                resolve(res.data.subjects);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default useFetchSubjects;
