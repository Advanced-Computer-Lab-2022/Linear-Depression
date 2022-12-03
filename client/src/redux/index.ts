import { courseSlice, getCourse } from "./features/course/courseSlice";
import { CoursesListSlice, getCourseList, getMyCourses } from "./features/courseList/coursesListSlice";
import { getProfile, profileSlice } from "./features/profile/profileSlice";
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
    profileSlice,
    getProfile,
    store,
    useAppDispatch,
    useAppSelector
};
