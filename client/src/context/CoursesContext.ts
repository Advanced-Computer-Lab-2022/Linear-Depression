import { createContext } from "react";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import ICourseProps from "../types/Course";

export const CoursesContext = createContext<{
    coursesResultSet: ICourseProps[];
    setCoursesResultSet: Dispatch<SetStateAction<ICourseProps[]>>;
}>({
    coursesResultSet: [],
    setCoursesResultSet: () => {}
});
