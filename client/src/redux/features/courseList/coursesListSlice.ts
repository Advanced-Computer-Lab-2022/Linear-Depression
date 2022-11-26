import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import ICourseProps from "src/types/Course";

import { fetchAllCourses, fetchMyCourses } from "@internals/services";

const getCourseList = createAsyncThunk("course/getCourses", async (searchParameters: URLSearchParams, thunkapi) => {
    try {
        const data = await fetchAllCourses(searchParameters);
        return data;
    } catch (err) {
        return thunkapi.rejectWithValue(err);
    }
});

const getMyCourses = createAsyncThunk("course/getCourses", async (searchParameters: URLSearchParams, thunkapi) => {
    try {
        const data = await fetchMyCourses(searchParameters);
        return data;
    } catch (err) {
        return thunkapi.rejectWithValue(err);
    }
});

interface CourseListState {
    data: null | ICourseProps[];
    loading: boolean;
    error: null | any;
}
const initialState = {
    data: [],
    loading: false,
    error: null
} as CourseListState;

const CoursesListSlice = createSlice({
    name: "coursesList",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCourseList.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCourseList.fulfilled, (state, action: PayloadAction<ICourseProps[]>) => {
            state.data = action.payload;
            state.loading = false;
        });
        builder.addCase(getCourseList.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.loading = false;
        });
    }
});

export { CoursesListSlice, getCourseList, getMyCourses };
