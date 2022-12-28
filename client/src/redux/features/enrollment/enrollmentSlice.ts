import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { fetchMyEnrollment } from "@internals/services";
import { Enrollment } from "@internals/types";

const getEnrollment = createAsyncThunk("enrollment/getEnrollment", async (courseId: string, thunkapi) => {
    try {
        const data = await fetchMyEnrollment(courseId);
        return data;
    } catch (err) {
        return thunkapi.rejectWithValue(err);
    }
});

interface EnrollmentState {
    data: null | Enrollment;
    loading: boolean;
    error: null | string;
}
const initialState = {
    data: null,
    loading: false,
    error: null
} as EnrollmentState;

const enrollmentSlice = createSlice({
    name: "enrollment",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getEnrollment.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getEnrollment.fulfilled, (state, action: PayloadAction<Enrollment>) => {
            state.data = action.payload;
            state.loading = false;
        });
        builder.addCase(getEnrollment.rejected, (state, action: PayloadAction<any>) => {
            state.data = null;
            state.error = action.payload;
            state.loading = false;
        });
    }
});

export { enrollmentSlice, getEnrollment };
