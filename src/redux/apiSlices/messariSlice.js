import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as messariApi from '../../api/messariApi';

export const getAllMessariCoins = createAsyncThunk(
    "messari/getAllMessariCoins",
    async () => { 
        let response = await messariApi.getAllMessariCoins();
        return response.data;
    }
);

export const getMessariCoinMetadata = createAsyncThunk(
    "messari/getMessariCoinMetadata",
    async (coin) => {
        let response = await messariApi.getMessariCoinMetadata(coin);
        return response.data;
    }
);

export const messariSlice = createSlice({
    name: "messari",
    initialState: {
        allCoins: null,
        coinMetadata: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllMessariCoins.fulfilled, (state, action) => {
            return { ...state, allCoins: action.payload };
        });
        builder.addCase(getMessariCoinMetadata.fulfilled, (state, action) => {
            return { ...state, coinMetadata: { [action.payload.symbol.toLowerCase()]: action.payload } };
        });
    },
});

// export const { } = messariSlice.actions;

export default messariSlice.reducer;