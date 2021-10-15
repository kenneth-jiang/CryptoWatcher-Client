import { createSlice } from '@reduxjs/toolkit';
import * as binanceApi from '../../api/binanceApi';

export const binanceSlice = createSlice({
    name: "binance",
    initialState: {
        OHLC: null,
        orderBook: null,
        recentTrades: null,
    },
    reducers: {
        getOHLC: (state, action) => {

        },
        getOrderBook: (state, action) => {

        },
        getRecentTrades: (state, action) => {

        },
        addOHLC: (state, action) => {

        },
        addOrderBook: (state, action) => {

        },
        addRecentTrades: (state, action) => {

        },
    },
});

export const { getOHLC, getOrderBook, getRecentTrades, addOHLC, addOrderBook, addRecentTrades } = binanceSlice.actions;

export default binanceSlice.reducer;