import axios from 'axios';

const baseUrl = "https://api.binance.us";

export const getBinanceOHLC = (symbol, interval = "1m", limit = 50) => {
    return axios.get(baseUrl + "/api/v3/klines?symbol=" + symbol.toUpperCase() + "USD&interval=" + interval + "&limit=" + limit);
};

export const getBinanceOrderBook = (symbol) => {
    return axios.get(baseUrl + "/api/v3/depth?symbol=" + symbol.toUpperCase() + "USD");
};

export const getBinanceRecentTrades = (symbol) => {
    return axios.get(baseUrl + "/api/v3/trades?symbol=" + symbol.toUpperCase() + "USD");
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