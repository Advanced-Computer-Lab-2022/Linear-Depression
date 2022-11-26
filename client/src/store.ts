import { configureStore } from "@reduxjs/toolkit";

import courseSlice from "./features/course/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import CoursesListSlice from "./features/courseList/coursesListSlice";
import subjectsSlice from "./features/subjects/subjectSlice";

const store = configureStore({
    reducer: {
        course: courseSlice,
        coursesList: CoursesListSlice,
        subjects: subjectsSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
