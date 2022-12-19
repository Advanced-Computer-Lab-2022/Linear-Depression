import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Enrollement from "src/types/Enrollement";

import { fetchMyEnrollement } from "@internals/services";

const getEnrollement = createAsyncThunk("enrollement/getEnrolllement", async (courseId: string, thunkapi) => {
    try {
        const data = await fetchMyEnrollement(courseId);
        return data;
    } catch (err) {
        return thunkapi.rejectWithValue(err);
    }
});

interface EnrollementState {
    data: null | Enrollement;
    loading: boolean;
    error: null | string;
}
const initialState = {
    data: null,
    loading: false,
    error: null
} as EnrollementState;

const enrollementSlice = createSlice({
    name: "enrollement",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getEnrollement.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getEnrollement.fulfilled, (state, action: PayloadAction<Enrollement>) => {
            state.data = action.payload;
            state.loading = false;
        });
        builder.addCase(getEnrollement.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload;
            state.loading = false;
        });
    }
});

export { enrollementSlice, getEnrollement };
