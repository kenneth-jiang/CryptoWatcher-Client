import axios from 'axios';
import request from './request';

const baseUrl = "https://api.binance.us";

export const getBinanceCoinOHLC = (symbol, interval = "1m", limit = 50) => {
    // return axios.get(baseUrl + "/api/v3/klines?symbol=" + symbol.toUpperCase() + "USD&interval=" + interval + "&limit=" + limit);
    return request.get("/binance/ohlc", { params: {
            symbol: symbol,
            interval: interval,
            limit: limit,
    }});
};

export const getBinanceCoinOrderBook = (symbol) => {
    // return axios.get(baseUrl + "/api/v3/depth?symbol=" + symbol.toUpperCase() + "USD");
    return request.get("/binance/orderbook", { params: {
        symbol: symbol,
    }});
};

export const getBinanceCoinRecentTrades = (symbol) => {
    // return axios.get(baseUrl + "/api/v3/trades?symbol=" + symbol.toUpperCase() + "USD");
    return request.get("/binance/recenttrades", { params: {
        symbol: symbol,
    }});
};

export const getBinanceCoinList = () => {
    return axios.get(baseUrl + "/api/v3/exchangeInfo");
};

export const getBinanceOHLC = (symbol, interval = "1m", limit = 50) => {
    return axios.get(baseUrl + "/api/v3/klines?symbol=" + symbol.toUpperCase() + "USD&interval=" + interval + "&limit=" + limit);
    // return request.get("/binance/ohlc", {
    //     params: {
    //         symbol: symbol,
    //         interval: interval,
    //         limit: limit,
    //     }
    // });
};

export const getBinanceOrderBook = (symbol) => {
    return axios.get(baseUrl + "/api/v3/depth?symbol=" + symbol.toUpperCase() + "USD");
    // return request.get("/binance/orderbook", {
    //     params: {
    //         symbol: symbol,
    //     }
    // });
};

export const getBinanceRecentTrades = (symbol) => {
    return axios.get(baseUrl + "/api/v3/trades?symbol=" + symbol.toUpperCase() + "USD");
    // return request.get("/binance/recenttrades", {
    //     params: {
    //         symbol: symbol,
    //     }
    // });
};

export const newBinanceWebSocket = () => {
    return new WebSocket("wss://stream.binance.us:9443/ws");
};

export const subscribeBinanceWebSocketOHLCOrderBookRecentTrades = (symbol, interval = "1m") => {
    return (JSON.stringify({
        "method": "SUBSCRIBE",
        "params": [
            symbol + "usd@kline_" + interval,
            symbol + "usd@depth20",
            symbol + "usd@trade",
        ],
        "id": 1,
    }));
};

export const unsubscribeBinanceWebSocketOHLCOrderBookRecentTrades = (symbol, interval = "1m") => {
    return (JSON.stringify({
        "method": "UNSUBSCRIBE",
        "params": [
            symbol + "usd@kline_" + interval,
            symbol + "usd@depth",
            symbol + "usd@trade",
        ],
        "id": 1,
    }));
};