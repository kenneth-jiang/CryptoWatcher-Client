import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as lunarcrushApi from '../../api/lunarcrushApi';

export const getLunarcrushGlobalData = createAsyncThunk(
    "lunarcrush/getLunarcrushGlobalData",
    async () => {
        const response = await lunarcrushApi.getLunarcrushGlobalData();
        return response.data;
    }
);

export const lunarcrushSlice = createSlice({
    name: "lunarcrush",
    initialState: {
        globalData: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLunarcrushGlobalData.fulfilled, (state, action) => {
            return { ...state, globalData: action.payload };
        });
    },
});

// export const { } = lunarcrushSlice.actions;

export default lunarcrushSlice.reducer;