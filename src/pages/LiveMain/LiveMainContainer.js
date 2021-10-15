import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LiveMainOptions from './LiveMainOptions';
import LiveMainAutoComplete from './LiveMainAutoComplete';
import Loading from '../../components/Loading';
import * as constants from '../../utils/constants';
import * as coingeckoApi from '../../api/coingeckoApi';
import * as messariApi from '../../api/messariApi';

export default () => {
    const [ assetList, setAssetList ] = useState(null);
    const [ assetData, setAssetData ] = useState(null);
    const [ treeMapData, setTreeMapData ] = useState(null);
    const [ displayData, setDisplayData ] = useState(null);
    const [ group, setGroup ] = useState("sectors");
    const [ duration, setDuration ] = useState("1H");
    const [ show, setShow ] = useState("marketcap");
    const [ zoomed, setZoomed ] = useState(false);
    const [ currentTab, setCurrentTab ] = useState(0);
    const [ options, setOptions ] = useState(constants.liveMainTreeMapChartOptions);
    
    let history = useHistory();

    useEffect(() => {
        async function getMessariAssetList() {
            let messariAssetListResponse = await messariApi.getAllMessariCoins();
            setAssetList(messariAssetListResponse.data);
        }
        getMessariAssetList();
        async function getCoinGeckoAssetList() {
            let coinGeckoAssetListResponse = await coingeckoApi.getCoingeckoAssetList();
            setAssetData(coinGeckoAssetListResponse.data);
        };
        getCoinGeckoAssetList();
        let events = {
            dataPointSelection: (event, chartContext, config) => {
                if (config.w.globals.initialSeries.length === 1) {
                    return setZoomed(false);
                    // let name = config.w.globals.initialSeries[config.seriesIndex].data[config.dataPointIndex].data.id;
                    // return history.push("/live/" + name.toLowerCase());
                }
                setZoomed(true);
                return setDisplayData([config.w.globals.initialSeries[config.seriesIndex]]);
            },
            legendClick: (chartContext, seriesIndex, config) => {
                if (config.globals.initialSeries.length === 1) {
                    return setZoomed(false);
                }
                setZoomed(true);
                return setDisplayData([config.globals.initialSeries[seriesIndex]]);
            },
        };
        setOptions((prevOptions) => {
            let newOptions = { ...prevOptions };
            newOptions.chart.events = events;
            return newOptions;
        });
    }, []);

    useEffect(() => {
        if (assetList) {
            let formattedAssetDataList = [];
            assetList.data.map((asset) => {
                let assetData = {
                    id: asset.slug,
                    name: asset.name,
                    symbol: asset.symbol,
                };
                if (asset.profile) {
                    if (asset.profile.token_details) {
                        assetData.algorithm = asset.profile.token_details.mining_algorithm && asset.profile.token_details.mining_algorithm !== "n/a" ? [ asset.profile.token_details.mining_algorithm ] : [];
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
                        assetData.marketcapDominance = asset.metrics.marketcap.marketcap_dominance_percent || 0;
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
                        assetData.fillColor = asset.metrics.market_data.percent_change_usd_last_1_hour > 0 ? "#52B12C" : "#CD363A";
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
            setTreeMapData(formattedAssetDataList);
        };
    }, [ assetList ]);

    useEffect(() => {
        if (treeMapData && !zoomed) {
            let showDurationValue = show;
            if (show.split("percentageChange").length > 1 || show.split("volume").length > 1 || show.split("topGainers").length > 1 || show.split("topLosers").length > 1) {
                showDurationValue = show + duration;
            };
            let groupObj = {};
            let treeMapDataCopy = treeMapData.slice();
            treeMapDataCopy.map((asset) => {
                if (asset[showDurationValue] !== 0) {
                    let formattedAssetData = { x: asset.name, y: asset[showDurationValue], fillColor: asset.fillColor, data: { ...asset, group: group, show: show, duration: duration } };
                    if (!group) {
                        groupObj["Assets"] ? groupObj["Assets"].push(formattedAssetData) : groupObj["Assets"] = [ formattedAssetData ];
                    } else if (asset[group].length > 0) {
                        groupObj[asset[group][0]] ? groupObj[asset[group][0]].push(formattedAssetData) : groupObj[asset[group][0]] = [ formattedAssetData ];
                    } else {
                        groupObj["Other"] ? groupObj["Other"].push(formattedAssetData) : groupObj["Other"] = [ formattedAssetData ];
                    };
                };
            });
            let formattedGroupList = [];
            Object.keys(groupObj).map((key) => {
                formattedGroupList.push({ name: key, data: groupObj[key] });
            });
            setDisplayData(formattedGroupList);
        };
    }, [ treeMapData, group, duration, show, zoomed ]);

    return (assetList && treeMapData && displayData
        ? <Container>
            <Tabs
                indicatorColor="primary"
                value={currentTab}
                onChange={(event, newValue) => setCurrentTab(newValue)}
            >
                <Tab label="Today's Market" />
                <Tab label="Search Assets" />
            </Tabs>
            {currentTab === 0
            ? <React.Fragment>
                <br />
                <br />
                <LiveMainOptions
                    treeMapConstants={constants.liveMainTreeMapConstants}
                    group={group}
                    setGroup={setGroup}
                    duration={duration}
                    setDuration={setDuration}
                    show={show}
                    setShow={(value) => {
                        if (value === "volume") {
                            if (["1H", "1D"].indexOf(duration) === -1) {
                                setDuration("1H");
                            };
                        };
                        return setShow(value);
                    }}
                    zoomed={zoomed}
                    setZoomed={setZoomed}
                />
                <ReactApexChart 
                    options={options}
                    series={displayData}
                    type="treemap"
                />
            </React.Fragment>
            : <LiveMainAutoComplete assetData={assetData} />
            }
        </Container>
        : <Loading />
    );
};