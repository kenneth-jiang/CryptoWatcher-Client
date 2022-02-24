import { configureStore } from '@reduxjs/toolkit';
import binance from './apiSlices/binanceSlice';
import coingecko from './apiSlices/coingeckoSlice';
import coinmarketcap from './apiSlices/coinmarketcapSlice';
import cryptocompare from './apiSlices/cryptocompareSlice';
import lunarcrush from './apiSlices/lunarcrushSlice';
import messari from './apiSlices/messariSlice';
import authentication from './pageSlices/authenticationSlice';
import coinDetailPage from './pageSlices/coinDetailPageSlice';
import coinsListPage from './pageSlices/coinsListPageSlice';
import landingPage from './pageSlices/landingPageSlice';

export default configureStore({
    reducer: {
        binance,
        coingecko,
        coinmarketcap,
        cryptocompare,
        lunarcrush,
        messari,
        authentication,
        coinDetailPage,
        coinsListPage,
        landingPage,
    },
});