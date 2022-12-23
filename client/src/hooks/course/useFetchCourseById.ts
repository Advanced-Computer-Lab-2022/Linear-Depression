import { useEffect } from "react";

import { useAppDispatch, getCourse } from "@internals/redux";

const useFetchCourseById = (id: string) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getCourse(id));
    }, [id]);
};

export default useFetchCourseById;
