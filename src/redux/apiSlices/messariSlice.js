import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as messariApi from '../../api/messariApi';

export const getAllMessariCoins = createAsyncThunk(
    "messari/getAllMessariCoins",
    async () => { 
        const response = await messariApi.getAllMessariCoins();
        return response.data.data;
    }
);

export const messariSlice = createSlice({
    name: "messari",
    initialState: {
        allCoins: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllMessariCoins.fulfilled, (state, action) => {
            return { ...state, allCoins: action.payload };
        });
    },
});

// export const { } = messariSlice.actions;

export default messariSlice.reducer;