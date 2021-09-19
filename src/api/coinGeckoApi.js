import axios from 'axios';
// import * as assetList from '../jsondata/assetList';
// import * as coinGeckoAssetList from '../jsonData/coinGeckoAssetList';
// import * as coinGeckoAssetDetail from '../jsonData/coinGeckoAssetDetail';
// import * as coinGeckoGlobalData from '../jsonData/coinGeckoGlobalData';
// import * as coinGeckoMarketChartData from '../jsonData/coinGeckoMarketChartData';

let useCacheData = false;

const baseUrl = "https://api.coingecko.com";

export const getAssetList = () => {
    return assetList.assetList;
};

export const getCoinGeckoAssetList = () => {
    if (useCacheData) {
        return coinGeckoAssetList.coinGeckoAssetList;
    };
    return axios.get(baseUrl + "/api/v3/coins/markets?vs_currency=usd&per_page=250&page=1&sparkline=true&price_change_percentage=7d");
};

export const getCoinGeckoAssetDetail = (coin) => {
    if (useCacheData) {
        if (!!coinGeckoAssetDetail.coinGeckoAssetDetail[coin]) {
            return coinGeckoAssetDetail.coinGeckoAssetDetail[coin];
        };
    };
    return axios.get(baseUrl + "/api/v3/coins/" + coin);
};

export const getCoinGeckoGlobalData = () => {
    if (useCacheData) {
        return coinGeckoGlobalData.coinGeckoGlobalData;
    };
    return axios.get(baseUrl + "/api/v3/global");
};

export const getCoinGeckoHistoricalMarketData = (coin, interval = "daily", duration = "30") => {
    if (useCacheData) {
        if (!!coinGeckoMarketChartData.coinGeckoMarketChartData[coin]) {
            return coinGeckoMarketChartData.coinGeckoMarketChartData[coin];
        };
    };
    return axios.get(baseUrl + "/api/v3/coins/" + coin + "/market_chart?vs_currency=usd&days=" + duration + "&interval=" + interval);
};