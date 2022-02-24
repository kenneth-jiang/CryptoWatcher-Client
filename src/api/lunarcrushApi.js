import request from './request';

// const baseUrl = "https://api.lunarcrush.com";

export const getLunarcrushGlobalData = () => {
    return request.get("/lunarcrush/globaldata");
    // return request.get(baseUrl + "/v2?data=global&interval=day&change=1d&data_points=30&key=" + process.env.LUNARCRUSH_API_KEY);
};