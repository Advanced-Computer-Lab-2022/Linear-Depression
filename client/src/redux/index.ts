import { courseSlice, getCourse } from "./features/course/courseSlice";
import { CoursesListSlice, getCourseList, getMyCourses } from "./features/courseList/coursesListSlice";
import { subjectsSlice, getSubjects } from "./features/subjects/subjectSlice";
import { store, useAppDispatch, useAppSelector } from "./store";

export {
    courseSlice,
    getCourse,
    CoursesListSlice,
    getCourseList,
    getMyCourses,
    subjectsSlice,
    getSubjects,
    store,
    useAppDispatch,
    useAppSelector
};
