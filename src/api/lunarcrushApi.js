import axios from 'axios';

const baseUrl = "https://api.lunarcrush.com";

export const getLunarcrushGlobalData = () => {
    return axios.get(baseUrl + "/v2?data=global&interval=day&change=1d&data_points=30&key=" + process.env.LUNARCRUSH_API_KEY);
};

export const getLunarcrushCoinOfTheDay = () => {
    return axios.get(baseUrl + "/v2?data=coinoftheday&key=" + process.env.LUNARCRUSH_API_KEY);
};