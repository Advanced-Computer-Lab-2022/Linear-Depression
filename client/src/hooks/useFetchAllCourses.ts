import { useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";

import { CountryContext } from "@internals/contexts";
import { useAppDispatch } from "@internals/redux";
import { getCourseList } from "@internals/redux";

const useFetchAllCourses = () => {
    const [searchParams] = useSearchParams();
    const { country } = useContext(CountryContext);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCourseList(searchParams));
    }, [searchParams, country]);
};

export default useFetchAllCourses;
