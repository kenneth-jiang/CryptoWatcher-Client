import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ReactApexChart from "react-apexcharts";
import AssetDetailBanner from './AssetDetailBanner';
import AssetDetailKeyMetrics from './AssetDetailKeyMetrics';
import AssetDetailReturns from './AssetDetailReturns';
import AssetDetailSummary from './AssetDetailSummary';
import AssetDetailHistoricalData from './AssetDetailHistoricalData';
import Loading from '../../components/Loading';
import * as coinGeckoApi from '../../api/coingeckoApi';
import * as binanceApi from '../../api/binanceApi';
import * as constants from '../../utils/constants';

export default (props) => {
    const [ assetData, setAssetData ] = useState(null);
    const [ OHLC, setOHLC ] = useState(null);
    const [ options, setOptions ] = useState(null);
    const [ selectedTab, setSelectedTab ] = useState(0);
    const [ historicalData, setHistoricalData ] = useState(null);

    useEffect(() => {
        async function getCoinGeckoAssetDetailGlobalDataHistoricalDataAndBinanceOHLC() {
            let assetDataObj = {};
            let coinGeckoAssetDetailResponse = await coinGeckoApi.getCoingeckoAssetDetail(props.match.params.name);
            assetDataObj = coinGeckoAssetDetailResponse.data;
            let coinGeckoGlobalDataResponse = await coinGeckoApi.getCoingeckoGlobalData();
            assetDataObj.global = coinGeckoGlobalDataResponse.data.data;
            setAssetData(assetDataObj);
            let binanceOHLCResponse = await binanceApi.getBinanceOHLC(assetDataObj.symbol, "3m", 480);
            let assetPrice = [];
            let assetVolume = [];
            let assetMin = parseFloat(binanceOHLCResponse.data[0][4]);
            binanceOHLCResponse.data.map((interval) => {
                assetPrice.push({ x: new Date(interval[0]), y: interval[4] });
                assetVolume.push({ x: new Date(interval[0]), y: interval[10] });
                if (parseFloat(assetMin) > parseFloat(interval[4])) {
                    assetMin = interval[4];
                }
            });
            setOHLC([
                { name: "Price", type: "area", data: assetPrice },
                { name: "Volume", type: "bar", data: assetVolume }
            ]);
            let assetDetailLineGraphOptionsCopy = {...constants.assetDetailLineGraphOptions};
            assetDetailLineGraphOptionsCopy.yaxis[0].min = parseFloat(assetMin) * .99;
            setOptions(assetDetailLineGraphOptionsCopy);
            let coinGeckoHistoricalData = await coinGeckoApi.getCoingeckoAssetHistoricalMarketData(props.match.params.name);
            let assetHistoricalData = [];
            coinGeckoHistoricalData.data.prices.map((interval) => {
                assetHistoricalData.push({ date: interval[0], price: interval[1] });
            });
            coinGeckoHistoricalData.data.market_caps.map((interval, index) => {
                if (assetHistoricalData[index].date === interval[0]) {
                    assetHistoricalData[index] = { ...assetHistoricalData[index], market_cap: interval[1] };
                }
            });
            coinGeckoHistoricalData.data.total_volumes.map((interval, index) => {
                if (assetHistoricalData[index].date === interval[0]) {
                    assetHistoricalData[index] = { ...assetHistoricalData[index], volume: interval[1] };
                }
            });
            setHistoricalData(assetHistoricalData.reverse());
        }
        getCoinGeckoAssetDetailGlobalDataHistoricalDataAndBinanceOHLC();
    }, []);

    const renderTabPanels = () => {
        if (selectedTab === 0) {
            return (
                <React.Fragment>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <AssetDetailBanner assetData={assetData} />
                            <ReactApexChart
                                options={options}
                                series={OHLC}
                                type="area"
                            />
                            <br />
                            <AssetDetailReturns assetData={assetData} />
                        </Grid>
                        <Grid item xs={4}>
                            <AssetDetailKeyMetrics assetData={assetData} />
                        </Grid>
                    </Grid>
                    <br />
                    <AssetDetailSummary assetData={assetData} />
                </React.Fragment>
            );
        } else if (selectedTab === 1) {
            return (
                <AssetDetailHistoricalData historicalData={historicalData} />
            );
        }
    };

    return (
        assetData && OHLC && options && historicalData
        ? <Container>
            <Tabs
                indicatorColor="primary"
                textColor="primary"
                value={selectedTab}
                onChange={(event, newValue) => setSelectedTab(newValue)}
            >
                <Tab label="Overview" />
                <Tab label="Historical Data" />
            </Tabs>
            <br />
            {renderTabPanels()}
        </Container>
        : <Loading />
    );
};