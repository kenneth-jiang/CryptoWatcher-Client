import { createSlice } from '@reduxjs/toolkit';

export const landingPageSlice = createSlice({
    name: "landingPage",
    initialState: {
        globalData: null,
        bannerGraphs: null,
        trendingCoins: null,
        zoomed: false,
        blockColors: "default",
        limit: 100,
        group: "sectors",
        show: "topGainers",
        duration: "1H",
        treeMapData: null,
        seriesData: null,
        newsArticles: null,
    },
    reducers: {
        setGlobalData: (state, action) => {
            return { ...state, globalData: action.payload };
        },
        setBannerGraphs: (state, action) => {
            let bannerGraphs = [];
            let bannerGraphsData = [
                {
                    name: "Market Cap",
                    color: "#2E93fA",
                    type: "currency",
                    value: "market_cap",
                },
                {
                    name: "Volume",
                    color: "#66DA26",
                    type: "currency",
                    value: "volume",
                },
                {
                    name: "Bitcoin Dominance",
                    color: "#F2A900",
                    type: "percentage",
                    value: "btc_dominance",
                },
                {
                    name: "Reddit Posts",
                    color: "#FF5700",
                    type: "num",
                    value: "reddit_posts",
                },
                {
                    name: "Tweets",
                    color: "#1DA1F2",
                    type: "num",
                    value: "tweets",
                },
            ];
            const formatBannerGraphData = (graph) => {
                let priceData = [];
                action.payload.timeSeries.map((time) => {
                    priceData.push({ x: time.time * 1000, y: time[graph.value] });
                });
                return bannerGraphs.push({ name: graph.name, color: graph.color, type: graph.type, series: priceData });
            };
            bannerGraphsData.map((bannerGraphData) => {
                formatBannerGraphData(bannerGraphData);
            });
            return { ...state, bannerGraphs: bannerGraphs };
        },
        setTrendingCoins: (state, action) => {
            return { ...state, trendingCoins: action.payload };
        },
        setZoomed: (state, action) => {
            return { ...state, zoomed: action.payload };
        },
        setBlockColors: (state, action) => {
            if (state.blockColors === "default") {
                return { ...state, blockColors: "market" };
            } else if (state.blockColors === "market") {
                return { ...state, blockColors: "default" };
            };
        },
        setLimit: (state, action) => {
            return { ...state, limit: action.payload };
        },
        setGroup: (state, action) => {
            return { ...state, group: action.payload };
        },
        setDuration: (state, action) => {
            return { ...state, duration: action.payload };
        },
        setShow: (state, action) => {
            if (action.payload === "volume") {
                if (["1H", "1D"].indexOf(state.duration) === -1) {
                    state = { ...state, duration: "1H" };
                };
            };
            return { ...state, show: action.payload };
        },
        setTreeMapData: (state, action) => {
            let formattedAssetDataList = [];
            action.payload.map((asset) => {
                let assetData = {
                    id: asset.slug,
                    name: asset.name,
                    symbol: asset.symbol,
                };
                if (asset.profile) {
                    if (asset.profile.token_details) {
                        assetData.algorithm = asset.profile.token_details.mining_algorithm && asset.profile.token_details.mining_algorithm !== "n/a" ? [asset.profile.token_details.mining_algorithm] : [];
                    };
                };
                if (asset.metrics) {
                    if (asset.metrics.misc_data) {
                        assetData.sectors = asset.metrics.misc_data.sectors || [];
                        assetData.categories = asset.metrics.misc_data.categories || [];
                        assetData.tags = asset.metrics.misc_data.tags || [];
                    };
                    if (asset.metrics.marketcap) {
                        assetData.marketcap = asset.metrics.marketcap.current_marketcap_usd || 0;
                        assetData.dominance = asset.metrics.marketcap.marketcap_dominance_percent || 0;
                        assetData.marketcapRank = asset.metrics.marketcap.rank || 0;
                    };
                    if (asset.metrics.market_data) {
                        assetData.price = asset.metrics.market_data.price_usd || 0;
                        assetData.percentageChange1H = asset.metrics.market_data.percent_change_usd_last_1_hour || 0;
                        assetData.percentageChange1D = asset.metrics.market_data.percent_change_usd_last_24_hours || 0;
                        if (asset.metrics.market_data.ohlcv_last_1_hour) {
                            assetData.volume1H = asset.metrics.market_data.ohlcv_last_1_hour.volume || 0;
                        };
                        assetData.volume1D = asset.metrics.market_data.volume_last_24_hours || 0;
                        assetData.topGainers1H = asset.metrics.market_data.percent_change_usd_last_1_hour > 0 ? asset.metrics.market_data.percent_change_usd_last_1_hour : 0;
                        assetData.topLosers1H = asset.metrics.market_data.percent_change_usd_last_1_hour < 0 ? asset.metrics.market_data.percent_change_usd_last_1_hour : 0;
                        assetData.topGainers1D = asset.metrics.market_data.percent_change_usd_last_24_hours > 0 ? asset.metrics.market_data.percent_change_usd_last_24_hours : 0;
                        assetData.topLosers1D = asset.metrics.market_data.percent_change_usd_last_24_hours < 0 ? asset.metrics.market_data.percent_change_usd_last_24_hours : 0;
                        assetData.fillColor = asset.metrics.market_data.percent_change_usd_last_24_hours > 0 ? "#16C784" : "#EA3943";
                    };
                    if (asset.metrics.roi_data) {
                        assetData.percentageChange1W = asset.metrics.roi_data.percent_change_last_1_week || 0;
                        assetData.topGainers1W = asset.metrics.roi_data.percent_change_last_1_week > 0 ? asset.metrics.roi_data.percent_change_last_1_week : 0;
                        assetData.topLosers1W = asset.metrics.roi_data.percent_change_last_1_week < 0 ? asset.metrics.roi_data.percent_change_last_1_week : 0;
                        assetData.percentageChange1M = asset.metrics.roi_data.percent_change_last_1_month || 0;
                        assetData.topGainers1M = asset.metrics.roi_data.percent_change_last_1_month > 0 ? asset.metrics.roi_data.percent_change_last_1_month : 0;
                        assetData.topLosers1M = asset.metrics.roi_data.percent_change_last_1_month < 0 ? asset.metrics.roi_data.percent_change_last_1_month : 0;
                        assetData.percentageChange1Q = asset.metrics.roi_data.percent_change_last_3_months || 0;
                        assetData.topGainers1Q = asset.metrics.roi_data.percent_change_last_3_months > 0 ? asset.metrics.roi_data.percent_change_last_3_months : 0;
                        assetData.topLosers1Q = asset.metrics.roi_data.percent_change_last_3_months < 0 ? asset.metrics.roi_data.percent_change_last_3_months : 0;
                        assetData.percentageChange1Y = asset.metrics.roi_data.percent_change_last_1_year || 0;
                        assetData.topGainers1Y = asset.metrics.roi_data.percent_change_last_1_year > 0 ? asset.metrics.roi_data.percent_change_last_1_year : 0;
                        assetData.topLosers1Y = asset.metrics.roi_data.percent_change_last_1_year < 0 ? asset.metrics.roi_data.percent_change_last_1_year : 0;
                        assetData.percentageChangeMTD = asset.metrics.roi_data.percent_change_month_to_date || 0;
                        assetData.topGainersMTD = asset.metrics.roi_data.percent_change_month_to_date > 0 ? asset.metrics.roi_data.percent_change_month_to_date : 0;
                        assetData.topLosersMTD = asset.metrics.roi_data.percent_change_month_to_date < 0 ? asset.metrics.roi_data.percent_change_month_to_date : 0;
                        assetData.percentageChangeQTD = asset.metrics.roi_data.percent_change_quarter_to_date || 0;
                        assetData.topGainersQTD = asset.metrics.roi_data.percent_change_quarter_to_date > 0 ? asset.metrics.roi_data.percent_change_quarter_to_date : 0;
                        assetData.topLosersQTD = asset.metrics.roi_data.percent_change_quarter_to_date < 0 ? asset.metrics.roi_data.percent_change_quarter_to_date : 0;
                        assetData.percentageChangeYTD = asset.metrics.roi_data.percent_change_year_to_date || 0;
                        assetData.topGainersYTD = asset.metrics.roi_data.percent_change_year_to_date > 0 ? asset.metrics.roi_data.percent_change_year_to_date : 0;
                        assetData.topLosersYTD = asset.metrics.roi_data.percent_change_year_to_date < 0 ? asset.metrics.roi_data.percent_change_year_to_date : 0;
                    };
                };
                formattedAssetDataList.push(assetData);
            });
            return { ...state, treeMapData: formattedAssetDataList };
        },
        updateSeriesData: (state, action) => {
            if (action.payload) {
                return { ...state, seriesData: action.payload };
            };
            const { treeMapData, zoomed, limit, group, show, duration } = state;
            if (treeMapData && !zoomed) {
                let showDurationValue = show;
                if (show.split("percentageChange").length > 1 || show.split("volume").length > 1 || show.split("topGainers").length > 1 || show.split("topLosers").length > 1) {
                    showDurationValue = show + duration;
                };
                let groupObj = {};
                let treeMapDataCopy = treeMapData.slice();
                const compare = (a, b) => {
                    if (a[show] > b[show]) {
                        return -1;
                    };
                    if (a[show] < b[show]) {
                        return 1;
                    };
                    return 0;
                };
                treeMapDataCopy.sort(compare);
                treeMapDataCopy = treeMapDataCopy.slice(0, limit);
                treeMapDataCopy.map((asset) => {
                    if (asset[showDurationValue] !== 0) {
                        let formattedAssetData = {
                            x: asset.name,
                            y: asset[showDurationValue],
                            fillColor: state.blockColors === "market" ? asset.fillColor : null,
                            data: { ...asset, group: group, show: show, duration: duration },
                        };
                        if (!group) {
                            groupObj["Cryptocurrencies"] ? groupObj["Cryptocurrencies"].push(formattedAssetData) : groupObj["Cryptocurrencies"] = [formattedAssetData];
                        } else if (asset[group].length > 0) {
                            groupObj[asset[group][0]] ? groupObj[asset[group][0]].push(formattedAssetData) : groupObj[asset[group][0]] = [formattedAssetData];
                        } else {
                            groupObj["Other"] ? groupObj["Other"].push(formattedAssetData) : groupObj["Other"] = [formattedAssetData];
                        };
                    };
                });
                let formattedGroupList = [];
                Object.keys(groupObj).map((key) => {
                    formattedGroupList.push({ name: key, data: groupObj[key] });
                });
                return { ...state, seriesData: formattedGroupList };
            };
        },
        setNewsArticles: (state, action) => {
            return { ...state, newsArticles: action.payload };
        },
    },
});

export const { setGlobalData, setBannerGraphs, setTrendingCoins, setZoomed, setBlockColors, setLimit, setGroup, setShow, setDuration, setTreeMapData, updateSeriesData, setNewsArticles } = landingPageSlice.actions;

export default landingPageSlice.reducer;