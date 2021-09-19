import axios from 'axios';
// import * as binanceOHLC from '../jsonData/binanceOHLCData';
// import * as binanceOrderBook from '../jsonData/binanceOrderBookData';
// import * as binanceRecentTrades from '../jsonData/binanceRecentTradesData';

const baseUrl = "https://api.binance.us";

let useCacheData = false;

export const getBinanceOHLC = (symbol, interval = "1m", limit = 50) => {
    if (useCacheData) {
        if (!!binanceOHLC.binanceOHLC[symbol.toUpperCase()]) {
            return binanceOHLC.binanceOHLC[symbol.toUpperCase()];
        };
    };
    return axios.get(baseUrl + "/api/v3/klines?symbol=" + symbol.toUpperCase() + "USD&interval=" + interval + "&limit=" + limit);
};

export const getBinanceOrderBook = (symbol) => {
    if (useCacheData) {
        if (!!binanceOrderBook.binanceOrderBook[symbol.toUpperCase()]) {
            return binanceOrderBook.binanceOrderBook[symbol.toUpperCase()];
        };
    };
    return axios.get(baseUrl + "/api/v3/depth?symbol=" + symbol.toUpperCase() + "USD");
};

export const getBinanceRecentTrades = (symbol) => {
    if (useCacheData) {
        if (!!binanceRecentTrades.binanceRecentTrades[symbol.toUpperCase()]) {
            return binanceRecentTrades.binanceRecentTrades[symbol.toUpperCase()];
        };
    };
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

// export const subscribeBinanceWebSocketOHLC = (symbol, interval = "1m") => {
//     return (JSON.stringify({
//         "method": "SUBSCRIBE",
//         "params": [symbol + "usd@kline_" + interval],
//         "id": 1
//     }));
// };

// export const unsubscribeBinanceWebSocketOHLC = (symbol, interval = "1m") => {
//     return (JSON.stringify({
//         "method": "UNSUBSCRIBE",
//         "params": [symbol + "usd@kline_" + interval],
//         "id": 1
//     }));
// };

// export const subscribeBinanceWebSocketOrderBook = (symbol) => {
//     return (JSON.stringify({
//         "method": "SUBSCRIBE",
//         "params": [symbol + "usd@depth"],
//         "id": 1
//     }));
// };

// export const unsubscribeBinanceWebSocketOrderBook = (symbol) => {
//     return (JSON.stringify({
//         "method": "UNSUBSCRIBE",
//         "params": [symbol + "usd@depth"],
//         "id": 1
//     }));
// };

// export const subscribeBinanceWebSocketTrades = (symbol) => {
//     return (JSON.stringify({
//         "method": "SUBSCRIBE",
//         "params": [symbol + "usd@trade"],
//         "id": 1
//     }));
// };

// export const unsubscribeBinanceWebSocketTrades = (symbol) => {
//     return (JSON.stringify({
//         "method": "UNSUBSCRIBE",
//         "params": [symbol + "usd@trade"],
//         "id": 1
//     }));
// };
// Binance US
// API Key: xCbOqLiTREApkxKG2kZb1W1cAogAB3NyTXHAzD7qZr58LgdJeCY0Ls5C92EpEzBR
// Secret Key: KzO25KVWcJXLFKWnu4zfkio75794YH6TwPOG5Egl9QaDG3gAi3CQUKyReJyqYKuy

// export const getBinanceList = () => {
//     return axios.get(baseUrl + "/api/v3/exchangeInfo");
// };