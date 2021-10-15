import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as cryptocompareApi from '../../api/cryptocompareApi';

export const getCryptocompareNewsArticles = createAsyncThunk(
    "cryptocompare/getCryptocompareNewsArticles",
    async () => {
        let response = await cryptocompareApi.getCryptocompareNewsArticles();
        return response.data;
    }
);

export const cryptocompareSlice = createSlice({
    name: "cryptocompare",
    initialState: {
        newsArticles: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCryptocompareNewsArticles.fulfilled, (state, action) => {
            return { ...state, newsArticles: action.payload };
        });
    },
});

// export const { } = cryptocompareSlice.actions;

export default cryptocompareSlice.reducer;