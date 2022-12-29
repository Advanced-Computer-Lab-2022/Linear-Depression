import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { fetchProfile } from "@internals/services";
import { Profile } from "@internals/types";

const getProfile = createAsyncThunk("profile/getProfile", async (accessToken: string, thunkapi) => {
    try {
        const data = await fetchProfile(accessToken);
        return data;
    } catch (err) {
        return thunkapi.rejectWithValue(err);
    }
});

interface ProfileState {
    data: null | Profile; // TODO: Add other user types
    loading: boolean;
    error: null | any;
}
const initialState = {
    data: null,
    loading: false,
    error: null
} as ProfileState;

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProfile.pending, (state) => {
            state.loading = true;
            state.data = null;
        });
        builder.addCase(getProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
            state.data = action.payload;
            state.loading = false;
        });
        builder.addCase(getProfile.rejected, (state, action: PayloadAction<any>) => {
            state.data = null;
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export { profileSlice, getProfile };
