import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import { courseSlice } from "./features/course/courseSlice";
import { CoursesListSlice } from "./features/courseList/coursesListSlice";
import { profileSlice } from "./features/profile/profileSlice";
import { subjectsSlice } from "./features/subjects/subjectSlice";

const store = configureStore({
    reducer: {
        course: courseSlice.reducer,
        coursesList: CoursesListSlice.reducer,
        subjects: subjectsSlice.reducer,
        profile: profileSlice.reducer
    }
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { store, useAppDispatch, useAppSelector };
