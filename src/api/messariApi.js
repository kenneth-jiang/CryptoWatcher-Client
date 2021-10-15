import axios from 'axios';

const baseUrl = "https://data.messari.io";

export const getAllMessariCoins = (page = 1) => {
  return axios.get(baseUrl + "/api/v1/assets?limit=500&page=" + page);
};