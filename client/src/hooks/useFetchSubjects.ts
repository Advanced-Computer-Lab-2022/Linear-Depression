import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { getSubjects } from "../features/subjects/subjectSlice";

const useFetchSubjects = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getSubjects());
    }, []);
};

export default useFetchSubjects;
