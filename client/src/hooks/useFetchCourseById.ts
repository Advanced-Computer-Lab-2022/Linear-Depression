import { useEffect } from "react";
import { getCourse } from "../features/course/courseSlice";
import { useAppDispatch } from "../store";

const useFetchCourseById = (id: string) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getCourse(id));
    }, [id]);
};

export default useFetchCourseById;
