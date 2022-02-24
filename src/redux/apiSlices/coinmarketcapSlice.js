import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as coinmarketcapApi from '../../api/coinmarketcapApi';

export const getCoinmarketcapGlobalData = createAsyncThunk(
    "coinmarketcap/getCoinmarketcapGlobalData",
    async () => {
        let response = await coinmarketcapApi.getCoinmarketcapGlobalData();
        return response.data;
    }
);

export const coinmarketcapSlice = createSlice({
    name: "coinmarketcap",
    initialState: {
        globalData: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCoinmarketcapGlobalData.fulfilled, (state, action) => {
            return { ...state, globalData: action.payload };
        });
    }
});

// export const { } = coinmarketcap.actions;

export default coinmarketcapSlice.reducer;