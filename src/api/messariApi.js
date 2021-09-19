import axios from 'axios';
// import * as messariAssetList from '../jsondata/messariAssetList';

let baseUrl = "https://data.messari.io";

let useCacheData = false;

export const getAssetList = () => {
    if (useCacheData) {
        return messariAssetList.messariAssetList;
    };
    return axios.get(baseUrl + "/api/v1/assets?limit=500&page=1");
};