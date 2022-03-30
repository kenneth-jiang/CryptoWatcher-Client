import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as binanceApi from '../../api/binanceApi';

export const getBinanceCoinOHLC = createAsyncThunk(
    "binance/getBinanceCoinOHLC",
    async ({ symbol, interval, limit }) => {
        let response = await binanceApi.getBinanceCoinOHLC(symbol, interval, limit);
        return { symbol: symbol, data: response.data };
    }
);

export const binanceSlice = createSlice({
    name: "binance",
    initialState: {
        coinOHLC: {},
        coinOrderBook: null,
        coinRecentTrades: null,
        status: "pending",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBinanceCoinOHLC.pending, (state, action) => {
            return { ...state, status: "pending" };
        });
        builder.addCase(getBinanceCoinOHLC.fulfilled, (state, action) => {
            return { ...state, status: "fulfilled", coinOHLC: { ...state.coinOHLC, [action.payload.symbol]: action.payload.data } };
        });
        builder.addCase(getBinanceCoinOHLC.rejected, (state, action) => {
            return { ...state, status: "rejected" };
        });
    }
});

export const { } = binanceSlice.actions;

export default binanceSlice.reducer;