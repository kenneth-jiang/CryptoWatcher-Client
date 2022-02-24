import request from './request';

export const getCoinmarketcapGlobalData = () => {
    return request.get("/coinmarketcap/globaldata");
};