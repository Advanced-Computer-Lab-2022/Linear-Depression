import { useEffect } from "react";

import { getEnrollment, useAppDispatch } from "@internals/redux";

const useFetchMyEnrollment = (courseId: string) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getEnrollment(courseId));
    }, [courseId]);
};

export default useFetchMyEnrollment;
