import { fetchCourseById } from "@internals/services";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import ICourseProps from "src/types/Course";

export const getCourse = createAsyncThunk("course/getCourse", async (courseId: string, thunkapi) => {
    try {
        const data = await fetchCourseById(courseId);
        return data;
    } catch (err) {
        return thunkapi.rejectWithValue(err);
    }
});

interface CourseState {
    data: null | ICourseProps;
    loading: boolean;
    error: null | string;
}
const initialState = {
    data: null,
    loading: false,
    error: null
} as CourseState;

export const courseSlice = createSlice({
    name: "course",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCourse.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCourse.fulfilled, (state, action: PayloadAction<ICourseProps>) => {
            console.log("action.payload");
            state.data = action.payload;
            state.loading = false;
        });
        builder.addCase(getCourse.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.loading = false;
        });
    }
});

export default courseSlice.reducer;
