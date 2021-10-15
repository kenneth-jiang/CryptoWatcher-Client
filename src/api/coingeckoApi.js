import axios from 'axios';

const baseUrl = "https://api.coingecko.com";

export const getCoingeckoGlobalData = () => {
    return axios.get(baseUrl + "/api/v3/global");
};

export const getCoingeckoTrendingCoins = () => {
    return axios.get(baseUrl + "/api/v3/search/trending");
};

export const getAllCoingeckoCoins = (page = 1) => {
    return axios.get(baseUrl + "/api/v3/coins/markets?vs_currency=usd&per_page=250&page=" + page + "&sparkline=true&price_change_percentage=1h%2C7d%2C30d%2C1y");
};

export const getCoingeckoAssetList = () => {
    return axios.get(baseUrl + "/api/v3/coins/markets?vs_currency=usd&per_page=250&page=1&sparkline=true&price_change_percentage=7d");
};

export const getCoingeckoAssetDetail = (coin) => {
    return axios.get(baseUrl + "/api/v3/coins/" + coin);
};

export const getCoingeckoAssetHistoricalMarketData = (coin, interval = "daily", duration = "max") => {
    return axios.get(baseUrl + "/api/v3/coins/" + coin + "/market_chart?vs_currency=usd&days=" + duration + "&interval=" + interval);
};
