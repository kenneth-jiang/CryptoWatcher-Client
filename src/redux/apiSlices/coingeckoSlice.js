import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as coingeckoApi from '../../api/coingeckoApi';

export const getCoingeckoGlobalData = createAsyncThunk(
    "coingecko/getCoingeckoGlobalData",
    async () => {
        const response = await coingeckoApi.getCoingeckoGlobalData();
        return response.data;
    },
);

export const getCoingeckoTrendingCoins = createAsyncThunk(
    "coingecko/getCoingeckoTrendingCoins",
    async () => {
        const response = await coingeckoApi.getCoingeckoTrendingCoins();
        return response.data;
    },
);

export const getAllCoingeckoCoins = createAsyncThunk(
    "coingecko/getAllCoingeckoCoins",
    async () => {
        const pageOneResponse = await coingeckoApi.getAllCoingeckoCoins();
        const pageTwoResponse = await coingeckoApi.getAllCoingeckoCoins(2);
        return [ ...pageOneResponse.data, ...pageTwoResponse.data ];
    },
);

export const coingeckoSlice = createSlice({
    name: "coingecko",
    initialState: {
        globalData: null,
        trendingCoins: null,
        allCoins: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCoingeckoGlobalData.fulfilled, (state, action) => {
            return { ...state, globalData: action.payload };
        });
        builder.addCase(getCoingeckoTrendingCoins.fulfilled, (state, action) => {
            return { ...state, trendingCoins: action.payload };
        });
        builder.addCase(getAllCoingeckoCoins.fulfilled, (state, action) => {
            return { ...state, allCoins: action.payload };
        });
    }
});

// export const { } = coingeckoSlice.actions;

export default coingeckoSlice.reducer;