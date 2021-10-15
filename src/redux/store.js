import { configureStore } from '@reduxjs/toolkit';
import binance from './apiSlices/binanceSlice';
import coingecko from './apiSlices/coingeckoSlice';
import cryptocompare from './apiSlices/cryptocompareSlice';
import lunarcrush from './apiSlices/lunarcrushSlice';
import messari from './apiSlices/messariSlice';
import authentication from './pageSlices/authenticationSlice';
import coinsListPage from './pageSlices/coinsListPageSlice';
import landingPage from './pageSlices/landingPageSlice';

export default configureStore({
    reducer: {
        binance,
        coingecko,
        cryptocompare,
        lunarcrush,
        messari,
        authentication,
        coinsListPage,
        landingPage,
    },
});