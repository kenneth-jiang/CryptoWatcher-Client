import axios from 'axios';

const baseUrl = "https://min-api.cryptocompare.com";

export const getCryptocompareNewsArticles = () => {
    return axios.get(baseUrl + "/data/v2/news/?lang=EN&api_key=" + process.env.CRYPTOCOMPARE_API_KEY);
};