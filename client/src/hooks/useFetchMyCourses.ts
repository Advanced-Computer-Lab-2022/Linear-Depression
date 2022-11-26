import { useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";

import { CountryContext } from "@internals/contexts";
import { useAppDispatch } from "../store";
import { getMyCourses } from "../features/courseList/coursesListSlice";

const useFetchMyCourses = () => {
    const [searchParams] = useSearchParams();
    const { country } = useContext(CountryContext);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getMyCourses(searchParams));
    }, [searchParams, country]);
};

export default useFetchMyCourses;
