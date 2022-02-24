import request from './request';

// const baseUrl = "https://min-api.cryptocompare.com";

export const getCryptocompareNewsArticles = () => {
    return request.get("/cryptocompare/newsarticles");
    // return axios.get(baseUrl + "/data/v2/news/?lang=EN&api_key=" + process.env.CRYPTOCOMPARE_API_KEY);
};