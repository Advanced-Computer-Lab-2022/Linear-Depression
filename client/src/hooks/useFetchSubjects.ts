import { useEffect, useState } from "react";
import { fetchSubjects } from "@internals/services";

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

export default useFetchSubjects;
