import { useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";

import { getCourseList } from "../features/courseList/coursesListSlice";
import { useAppDispatch } from "../store";
import { CountryContext } from "@internals/contexts";

const useFetchAllCourses = () => {
    const [searchParams] = useSearchParams();
    const { country } = useContext(CountryContext);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCourseList(searchParams));
    }, [searchParams, country]);
};

export default useFetchAllCourses;
