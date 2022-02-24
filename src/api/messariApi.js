import request from './request';
import * as dummymessari from '../dummy/dummymessari';

// const baseUrl = "https://data.messari.io";

export const getAllMessariCoins = () => {
	return request.get("/messari/allcoins");
	// return axios.get(baseUrl + "/api/v1/assets?limit=500&page=" + page);
};

export const getMessariCoinMetadata = (coin) => {
	return request.get("/messari/coinmetadata", { params: {
		coin: coin,
	}});
	// return dummymessari.dummymessari;
};