import { createSlice } from '@reduxjs/toolkit';
import * as helpers from '../../utils/helpers';

export const coinsListPageSlice = createSlice({
    name: "coinsListPage",
    initialState: {
        formattedAllCoins: null,
        view: "table",
        viewData: null,
        sortValue: "marketCap",
        sortDirection: "descending",
        tablePage: 1,
        rowsPerPage: 10,
        cardsPage: 1,
        cardsPerPage: 24,
    },
    reducers: {
        formatAllCoinsData: (state, action) => {
            let coinsTableDataArray = [];
            action.payload.map((coin) => {
                coinsTableDataArray.push({
                    rank: coin.market_cap_rank,
                    image: coin.image,
                    name: coin.name,
                    symbol: coin.symbol.toUpperCase(),
                    price: coin.current_price,
                    marketCap: coin.market_cap,
                    volume1d: coin.total_volume,
                    low1d: helpers.currencyFormatter(coin.low_24h, 0, 10),
                    percentageCurrentToLow1d: helpers.percentageFormatter(((coin.current_price / coin.low_24h) - 1) * 100, 2, 2) || "0.00%",
                    high1d: helpers.currencyFormatter(coin.high_24h, 0, 10),
                    percentageCurrentToHigh1d: helpers.percentageFormatter(((coin.current_price / coin.high_24h) - 1) * 100, 2, 2) || "0.00%",
                    percentageCurrentToLowHigh1d: ((coin.current_price - coin.low_24h) / (coin.high_24h - coin.low_24h)) * 100,
                    return1h: coin.price_change_percentage_1h_in_currency,
                    return1d: coin.price_change_percentage_24h,
                    return1w: coin.price_change_percentage_7d_in_currency,
                    return1m: coin.price_change_percentage_30d_in_currency,
                    return1y: coin.price_change_percentage_1y_in_currency,
                    circulatingSupply: coin.circulating_supply,
                    maxSupply: coin.max_supply,
                    percentageCirculatingToMaxSupply: (coin.circulating_supply && coin.max_supply) ? (coin.circulating_supply / coin.max_supply) * 100 : null,
                    sparkline: coin.sparkline_in_7d.price,
                    fillColor: coin.price_change_percentage_7d_in_currency > 0 ? "#00752D" : "#e8093a",
                });
            });
            return { ...state, formattedAllCoins: coinsTableDataArray };
        },
        updateView: (state, action) => {
            return { ...state, view: action.payload };
        },
        updateViewData: (state, action) => {
            let coinsListCopy = state.formattedAllCoins.slice();
            if (action.payload) {
                coinsListCopy = coinsListCopy.filter((coin) => {
                    return (coin.name.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1) || (coin.symbol.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1);
                });
            }
            const compare = (a, b) => {
                if (a[state.sortValue] > b[state.sortValue]) {
                    return state.sortDirection === "descending" ? -1 : 1;
                };
                if (a[state.sortValue] < b[state.sortValue]) {
                    return state.sortDirection === "descending" ? 1 : -1;
                };
                return 0;
            };
            coinsListCopy.sort(compare);
            return { ...state, viewData: coinsListCopy, tablePage: 1, cardsPage: 1 };
        },
        updateSortValueAndDirection: (state, action) => {
            if (action.payload === state.sortValue) {
                if (state.sortDirection === "descending") {
                    return { ...state, sortDirection: "ascending" };
                } else if (state.sortDirection === "ascending") {
                    return { ...state, sortDirection: "descending" };
                };
            };
            return { ...state, sortValue: action.payload, sortDirection: "descending" };
        },
        updateTablePage: (state, action) => {
            return { ...state, tablePage: action.payload };
        },
        updateCardsPage: (state, action) => {
            return { ...state, cardsPage: action.payload };
        },

    },
});

export const { formatAllCoinsData, updateView, updateViewData, updateSortValueAndDirection, updateTablePage, updateCardsPage } = coinsListPageSlice.actions;

export default coinsListPageSlice.reducer;