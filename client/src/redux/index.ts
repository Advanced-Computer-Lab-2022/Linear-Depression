import { courseSlice, getCourse } from "./features/course/courseSlice";
import { CoursesListSlice, getCourseList, getMyCourses } from "./features/courseList/coursesListSlice";
import { enrollementSlice, getEnrollement } from "./features/enrollement/enrollementSlice";
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
    enrollementSlice,
    getEnrollement,
    profileSlice,
    getProfile,
    store,
    useAppDispatch,
    useAppSelector
};
