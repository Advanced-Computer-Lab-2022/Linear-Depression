import { useEffect } from "react";

import { getEnrollement, useAppDispatch } from "@internals/redux";

const useFetchMyEnrollement = (courseId: string) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getEnrollement(courseId));
    }, [courseId]);
};

export default useFetchMyEnrollement;
