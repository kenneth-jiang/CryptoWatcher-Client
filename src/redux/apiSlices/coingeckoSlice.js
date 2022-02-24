import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as coingeckoApi from '../../api/coingeckoApi';

export const getCoingeckoGlobalData = createAsyncThunk(
    "coingecko/getCoingeckoGlobalData",
    async () => {
        let response = await coingeckoApi.getCoingeckoGlobalData();
        return response.data;
    },
);

export const getCoingeckoTrendingCoins = createAsyncThunk(
    "coingecko/getCoingeckoTrendingCoins",
    async () => {
        let response = await coingeckoApi.getCoingeckoTrendingCoins();
        return response.data;
    },
);

export const getAllCoingeckoCoins = createAsyncThunk(
    "coingecko/getAllCoingeckoCoins",
    async () => {
        let response = await coingeckoApi.getAllCoingeckoCoins();
        return response.data;
        // const pageOneResponse = await coingeckoApi.getAllCoingeckoCoins();
        // const pageTwoResponse = await coingeckoApi.getAllCoingeckoCoins(2);
        // return [ ...pageOneResponse.data, ...pageTwoResponse.data ];
    },
);

export const getCoingeckoCoinOHLC = createAsyncThunk(
    "coingecko/getCoingeckoCoinOHLC",
    async (coin) => {
        let response = await coingeckoApi.getCoingeckoCoinOHLC(coin);
        return response.data;
    },
);

export const getCoingeckoCoinMetadata = createAsyncThunk(
    "coingecko/getCoingeckoCoinMetadata",
    async (coin) => {
        let response = await coingeckoApi.getCoingeckoCoinMetadata(coin);
        return response.data;
    },
);

export const getCoingeckoCoinHistoricalData = createAsyncThunk(
    "coingecko/getCoingeckoCoinHistoricalData",
    async ({ coin, symbol, interval }) => {
        let response = await coingeckoApi.getCoingeckoCoinHistoricalData(coin, interval);
        return { symbol: symbol, interval: interval, data: response.data };
    },
);

export const coingeckoSlice = createSlice({
    name: "coingecko",
    initialState: {
        globalData: null,
        trendingCoins: null,
        allCoins: null,
        coinOHLC: {},
        coinMetadata: {},
        coinHistoricalData: {},
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
        builder.addCase(getCoingeckoCoinOHLC.fulfilled, (state, action) => {
            return { ...state, coinOHLC: {
                ...state.coinOHLC,
                [action.payload.symbol.toLowerCase()]: action.payload,
            }};
        });
        builder.addCase(getCoingeckoCoinMetadata.fulfilled, (state, action) => {
            return { ...state, coinMetadata: {
                ...state.coinMetadata,
                [action.payload.symbol.toLowerCase()]: action.payload,
            }};
        });
        builder.addCase(getCoingeckoCoinHistoricalData.fulfilled, (state, action) => {
            return { ...state, coinHistoricalData: {
                ...state.coinHistoricalData,
                [action.payload.symbol.toLowerCase()]: {
                    ...state.coinHistoricalData[action.payload.symbol.toLowerCase()],
                    [action.payload.interval]: action.payload.data,
                },
            }};
        });
    },
});

// export const { } = coingeckoSlice.actions;

export default coingeckoSlice.reducer;