import axios from 'axios';
import request from './request';
import * as dummycoingecko from '../dummy/dummycoingecko';

const baseUrl = "https://api.coingecko.com";

export const getCoingeckoGlobalData = () => {
    return request.get("/coingecko/globaldata");
    // return axios.get(baseUrl + "/api/v3/global");
};

export const getCoingeckoTrendingCoins = () => {
    return request.get("/coingecko/trendingcoins");
    // return axios.get(baseUrl + "/api/v3/search/trending");
};

export const getAllCoingeckoCoins = (page = 1) => {
    return request.get("/coingecko/allcoins");
    // return axios.get(baseUrl + "/api/v3/coins/markets?vs_currency=usd&per_page=50&page=" + page + "&sparkline=true&price_change_percentage=1h%2C7d");
};

export const getCoingeckoCoinOHLC = (coin) => {
    return request.get("/coingecko/coinohlc", {
        params: {
            coin: coin,
        }
    });
    // return dummycoingecko.dummycoingecko;
};

export const getCoingeckoCoinMetadata = (coin) => {
    return request.get("/coingecko/coinmetadata", { params: {
        coin: coin,
    }});
    // return dummycoingecko.dummycoingecko;
};

export const getCoingeckoCoinHistoricalData = (coin, interval = "daily") => {
    let duration;
    if (interval === "minutely") {
        duration = "1";
    } else if (interval === "hourly") {
        duration = "90";
    } else {
        duration = "max";
    };
    return request.get("/coingecko/coinhistoricaldata", { params: {
        coin: coin,
        interval: interval,
        duration: duration,
    }});
    // return axios.get(baseUrl + "/api/v3/coins/" + coin + "/market_chart?vs_currency=usd&days=" + duration + "&interval=" + interval);
};

export const getCoingeckoAssetList = () => {
    return axios.get(baseUrl + "/api/v3/coins/markets?vs_currency=usd&per_page=200&page=1&sparkline=true&price_change_percentage=7d");
};

export const getCoingeckoAssetDetail = (coin) => {
    return axios.get(baseUrl + "/api/v3/coins/" + coin);
};

export const getCoingeckoAssetHistoricalMarketData = (coin, interval = "daily") => {
    return axios.get(baseUrl + "/api/v3/coins/" + coin + "/market_chart?vs_currency=usd&days=max&interval=" + interval);
};
