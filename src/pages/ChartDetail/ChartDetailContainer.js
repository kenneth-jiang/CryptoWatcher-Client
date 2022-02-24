import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ReactApexChart from "react-apexcharts";
import ChartDetailTabGroup from './ChartDetailTabGroup';
import ChartDetailAutoCompleteIntervalGroup from './ChartDetailAutoCompleteIntervalGroup';
import ChartDetailIntervalData from './ChartDetailIntervalData';
import Loading from '../../components/Loading';
import * as coingeckoApi from '../../api/coingeckoApi';
import * as binanceApi from '../../api/binanceApi';
import * as constants from '../../utils/constants';
import * as helpers from '../../utils/helpers';
import * as hooks from '../../utils/hooks';

export default (props) => {
    const [ selectedTab, setSelectedTab ] = useState(2);
    const [ multiMode, setMultiMode ] = useState(false);
    const [ assetData, setAssetData ] = useState(null);
    const [ selectedAsset, setSelectedAsset ] = useState(null);
    const [ interval, setInterval ] = useState("daily");
    const [ selectedDuration, setSelectedDuration ] = useState({ name: "1M", value: 30 });
    const [ historicalMarketData, setHistoricalMarketData ] = useState(null);
    const [ displayData, setDisplayData ] = useState(null);

    const [ secondSelectedAsset, setSecondSelectedAsset ] = useState(null);
    const [ secondSelectedDuration, setSecondSelectedDuration ] = useState({ name: "1M", value: 30 });
    const [ secondHistoricalMarketData, setSecondHistoricalMarketData ] = useState(null);
    const [ secondDisplayData, setSecondDisplayData ] = useState(null);

    useEffect(() => {
        async function getCoinGeckoAssetList() {
            let coinGeckoAssetListResponse = await coingeckoApi.getCoingeckoAssetList();
            setAssetData(coinGeckoAssetListResponse.data);
            for (let asset of coinGeckoAssetListResponse.data) {
                if (asset.id === props.match.params.name) {
                    setSelectedAsset(asset);
                    break;
                };
            };
        };
        getCoinGeckoAssetList();
    }, []);
    
    let prevSelectedAsset = hooks.usePrevious(selectedAsset);
    let prevSelectedDuration = hooks.usePrevious(selectedDuration);
    let prevInterval = hooks.usePrevious(interval);
    let prevSecondSelectedAsset = hooks.usePrevious(secondSelectedAsset);
    let prevSecondSelectedDuration = hooks.usePrevious(secondSelectedDuration);

    useEffect(() => {
        async function getCoinGeckoHistoricalMarketData() {
            //     let binanceOHLCResponse = await binanceApi.getBinanceOHLC(selectedAsset.symbol, interval, selectedDuration.value);
            //     // // let binanceOHLCResponse = await binanceApi.getBinanceOHLC(selectedAsset.symbol, selectedInterval, helpers.calculateIntervalDuration(selectedInterval, selectedDuration));
            //     let binancePriceArray = [];
            //     let binanceMarketCapArray = [];
            //     let binanceVolumeArray = [];
            //     binanceOHLCResponse.data.map((interval) => {
            //         binancePriceArray.push({ x: interval[0], y: interval.slice(4) });
            //         binanceMarketCapArray.push({ x: interval[0], y: interval[10] });
            //         binanceVolumeArray.push({ x: interval[0], y: interval[10] });
            //     });
            //     setHistoricalMarketData({
            //         price: [{ name: "Price", type: "line", data: coinGeckoPriceArray }],
            //         marketCap: [{ name: "Market Cap", type: "line", data: coinGeckoMarketCapArray }],
            //         volume: [{ name: "Volume", type: "bar", data: coinGeckoVolumeArray }],
            //     });
            let coinGeckoHistoricalMarketData = await coingeckoApi.getCoingeckoAssetHistoricalMarketData(selectedAsset.id, interval);
            let coinGeckoPriceArray = [];
            coinGeckoHistoricalMarketData.data.prices.map((day) => {
                coinGeckoPriceArray.push({ x: day[0], y: day[1] });
            });
            let coinGeckoMarketCapArray = [];
            coinGeckoHistoricalMarketData.data.market_caps.map((day) => {
                coinGeckoMarketCapArray.push({ x: day[0], y: day[1] });
            });
            let coinGeckoVolumeArray = [];
            coinGeckoHistoricalMarketData.data.total_volumes.map((day) => {
                coinGeckoVolumeArray.push({ x: day[0], y: day[1] });
            });
            setHistoricalMarketData({ ...historicalMarketData ,[interval]: {
                price: [{ name: "Price", type: "line", data: coinGeckoPriceArray }],
                marketCap: [{ name: "Market Cap", type: "line", data: coinGeckoMarketCapArray }],
                volume: [{ name: "Volume", type: "bar", data: coinGeckoVolumeArray }],
            }});

            setDisplayData({
                price: [{ name: "Price", type: "line", data: [...coinGeckoPriceArray].slice([...coinGeckoPriceArray].length - 1 - selectedDuration.value) }],
                marketCap: [{ name: "Market Cap", type: "line", data: [...coinGeckoMarketCapArray].slice([...coinGeckoMarketCapArray].length - 1 - selectedDuration.value) }],
                volume: [{ name: "Volume", type: "bar", data: [...coinGeckoVolumeArray].slice([...coinGeckoVolumeArray].length - 1 - selectedDuration.value) }],
            });
        };

        if (selectedAsset && (prevSelectedAsset !== selectedAsset)) {
            getCoinGeckoHistoricalMarketData();
        } else if (selectedAsset && (prevInterval !== interval)) {
            if (!historicalMarketData) {
                getCoinGeckoHistoricalMarketData();
            } else if (historicalMarketData) {
                if (!historicalMarketData[interval]) {
                    getCoinGeckoHistoricalMarketData();
                } else {
                    let historicalMarketDataCopy = { ...historicalMarketData[interval] };
                    setDisplayData({
                        price: [{ name: "Price", type: "line", data: historicalMarketDataCopy.price[0].data.slice(historicalMarketDataCopy.price[0].data.length - 1 - selectedDuration.value) }],
                        marketCap: [{ name: "Market Cap", type: "line", data: historicalMarketDataCopy.marketCap[0].data.slice(historicalMarketDataCopy.marketCap[0].data.length - 1 - selectedDuration.value) }],
                        volume: [{ name: "Volume", type: "bar", data: historicalMarketDataCopy.volume[0].data.slice(historicalMarketDataCopy.volume[0].data.length - 1 - selectedDuration.value) }],
                    });
                }
            }
        } else if (selectedAsset && (prevSelectedDuration !== selectedDuration)) {
            let historicalMarketDataCopy = {...historicalMarketData[interval]};
            setDisplayData({
                price: [{ name: "Price", type: "line", data: historicalMarketDataCopy.price[0].data.slice(historicalMarketDataCopy.price[0].data.length - 1 - selectedDuration.value) }],
                marketCap: [{ name: "Market Cap", type: "line", data: historicalMarketDataCopy.marketCap[0].data.slice(historicalMarketDataCopy.marketCap[0].data.length - 1 - selectedDuration.value) }],
                volume: [{ name: "Volume", type: "bar", data: historicalMarketDataCopy.volume[0].data.slice(historicalMarketDataCopy.volume[0].data.length - 1 - selectedDuration.value) }],
            });
        }

    }, [ selectedAsset, selectedDuration, interval ]);

    useEffect(() => {
        async function getSecondCoinGeckoHistoricalMarketData() {
            let coinGeckoHistoricalMarketData = await coingeckoApi.getCoingeckoAssetHistoricalMarketData(secondSelectedAsset.id, interval);
            let coinGeckoPriceArray = [];
            coinGeckoHistoricalMarketData.data.prices.map((day) => {
                coinGeckoPriceArray.push({ x: day[0], y: day[1] });
            });
            let coinGeckoMarketCapArray = [];
            coinGeckoHistoricalMarketData.data.market_caps.map((day) => {
                coinGeckoMarketCapArray.push({ x: day[0], y: day[1] });
            });
            let coinGeckoVolumeArray = [];
            coinGeckoHistoricalMarketData.data.total_volumes.map((day) => {
                coinGeckoVolumeArray.push({ x: day[0], y: day[1] });
            });
            setSecondHistoricalMarketData({ ...secondHistoricalMarketData, [interval]: {
                price: [{ name: "Price", type: "line", data: coinGeckoPriceArray }],
                marketCap: [{ name: "Market Cap", type: "line", data: coinGeckoMarketCapArray }],
                volume: [{ name: "Volume", type: "bar", data: coinGeckoVolumeArray }],
            }});
            setSecondDisplayData({
                price: [{ name: "Price", type: "line", data: [...coinGeckoPriceArray].slice([...coinGeckoPriceArray].length - 1 - secondSelectedDuration.value) }],
                marketCap: [{ name: "Market Cap", type: "line", data: [...coinGeckoMarketCapArray].slice([...coinGeckoMarketCapArray].length - 1 - secondSelectedDuration.value) }],
                volume: [{ name: "Volume", type: "bar", data: [...coinGeckoVolumeArray].slice([...coinGeckoVolumeArray].length - 1 - secondSelectedDuration.value) }],
            });
        };
        if (secondSelectedAsset && multiMode && (prevSecondSelectedAsset !== secondSelectedAsset)) {
            getSecondCoinGeckoHistoricalMarketData();
        } else if (secondSelectedAsset && multiMode && (prevInterval !== interval)) {
            if (!secondHistoricalMarketData) {
                getSecondCoinGeckoHistoricalMarketData();
            } else if (secondHistoricalMarketData) {
                if (!secondHistoricalMarketData[interval]) {
                    getSecondCoinGeckoHistoricalMarketData();
                } else {
                    let secondHistoricalMarketDataCopy = { ...secondHistoricalMarketData[interval] };
                    setSecondDisplayData({
                        price: [{ name: "Price", type: "line", data: secondHistoricalMarketDataCopy.price[0].data.slice(secondHistoricalMarketDataCopy.price[0].data.length - 1 - secondSelectedDuration.value) }],
                        marketCap: [{ name: "Market Cap", type: "line", data: secondHistoricalMarketDataCopy.marketCap[0].data.slice(secondHistoricalMarketDataCopy.marketCap[0].data.length - 1 - secondSelectedDuration.value) }],
                        volume: [{ name: "Volume", type: "bar", data: secondHistoricalMarketDataCopy.volume[0].data.slice(secondHistoricalMarketDataCopy.volume[0].data.length - 1 - secondSelectedDuration.value) }],
                    });
                }
            }
        } else if (secondSelectedAsset && multiMode && (prevSecondSelectedDuration !== secondSelectedDuration)) {
            let secondHistoricalMarketDataCopy = { ...secondHistoricalMarketData[interval] };
            setSecondDisplayData({
                price: [{ name: "Price", type: "line", data: secondHistoricalMarketDataCopy.price[0].data.slice(secondHistoricalMarketDataCopy.price[0].data.length - 1 - secondSelectedDuration.value) }],
                marketCap: [{ name: "Market Cap", type: "line", data: secondHistoricalMarketDataCopy.marketCap[0].data.slice(secondHistoricalMarketDataCopy.marketCap[0].data.length - 1 - secondSelectedDuration.value) }],
                volume: [{ name: "Volume", type: "bar", data: secondHistoricalMarketDataCopy.volume[0].data.slice(secondHistoricalMarketDataCopy.volume[0].data.length - 1 - secondSelectedDuration.value) }],
            });
        };
    }, [ secondSelectedAsset, secondSelectedDuration, interval ]);

    let history = useHistory();

    const updateSelectedAsset = (asset) => {
        history.push("/chart/" + asset.id.toLowerCase());
        return setSelectedAsset(asset);
    };

    const setSelectedTabAndDuration = (clickedTab) => {
        setSelectedTab(clickedTab);
        if (clickedTab === 0) {
            setInterval("minutely");
        }
        if (clickedTab === 1) {
            setInterval("hourly");
        }
        if (clickedTab === 2 || clickedTab === 3) {
            setInterval("daily");
        }
        setSelectedDuration(constants.chartDetailDurationConstants[clickedTab][0]);
        if (multiMode) {
            setSecondSelectedDuration(constants.chartDetailDurationConstants[clickedTab][0]);
        };
    };

    const renderSingleChart = () => {
        return (
            <Container style={{ position: "relative" }}>
                <ChartDetailTabGroup
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTabAndDuration}
                    multiMode={multiMode}
                    setMultiMode={setMultiMode}
                />
                <br />
                <ChartDetailAutoCompleteIntervalGroup
                    assetData={assetData}
                    selectedAsset={selectedAsset}
                    updateSelectedAsset={updateSelectedAsset}
                    durations={constants.chartDetailDurationConstants[selectedTab]}
                    selectedDuration={selectedDuration}
                    setSelectedDuration={setSelectedDuration}
                    startEndTime={{ start: displayData.price[0].data[0].x, end: displayData.price[0].data[displayData.price[0].data.length - 1].x}}
                />
                <br />
                <ChartDetailIntervalData
                    selectedAsset={selectedAsset}
                    historicalMarketData={displayData}
                />
                <br />
                <ReactApexChart
                    options={constants.chartDetailLineGraph}
                    series={selectedTab === 3 ? displayData.marketCap : displayData.price}
                    type="line"
                    height={600}
                />
                <ReactApexChart
                    options={constants.chartDetailBarGraph}
                    series={displayData.volume}
                    type="bar"
                    height={200}
                />
            </Container>
        );
    };

    const renderSecondChart = () => {
        return (
            secondSelectedAsset && secondHistoricalMarketData && secondDisplayData
            ? <React.Fragment>
                <ChartDetailAutoCompleteIntervalGroup
                    assetData={assetData}
                    selectedAsset={secondSelectedAsset}
                    updateSelectedAsset={setSecondSelectedAsset}
                    durations={constants.chartDetailDurationConstants[selectedTab]}
                    selectedDuration={secondSelectedDuration}
                    setSelectedDuration={setSecondSelectedDuration}
                    startEndTime={{ start: secondDisplayData.price[0].data[0].x, end: secondDisplayData.price[0].data[secondDisplayData.price[0].data.length - 1].x}}
                />
                <br />
                <ChartDetailIntervalData
                    selectedAsset={secondSelectedAsset}
                    historicalMarketData={secondDisplayData}
                />
                <br />
                <ReactApexChart
                    options={constants.chartDetailLineGraph}
                    series={selectedTab === 3 ? secondDisplayData.marketCap : secondDisplayData.price}
                    type="line"
                    height={600}
                />
                <ReactApexChart
                    options={constants.chartDetailBarGraph}
                    series={secondDisplayData.volume}
                    type="bar"
                    height={200}
                />
            </React.Fragment>
            : <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                minHeight: "80vh"
            }}>
                <div style={{ width: "40%" }}>
                    <Typography variant="h5">
                        Select your second aset.
                    </Typography>
                    <br />
                    <Autocomplete
                        // style={{ width: "80%" }}
                        options={assetData}
                        getOptionLabel={(option) => option.name}
                        renderOption={(option) => {
                            return (
                                <React.Fragment>
                                    <img src={option.image} style={{ maxHeight: "20px", maxWidth: "20px" }} />
                                    &nbsp;&nbsp;
                                    {option.name}
                                </React.Fragment>
                            );
                        }}
                        onChange={(event, value) => setSecondSelectedAsset(value)}
                        renderInput={(params) => {
                            return (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Search Assets"
                                />
                            );
                        }}
                    />
                </div>
            </div>
        );
    };

    const renderMultiChart = () => {
        return (
            <Grid container spacing={4} style={{ position: "absolute", left: 0, right: 0, width: "98%", marginLeft: "auto", marginRight: "auto" }}>
                <Grid item xs={12}>
                    <ChartDetailTabGroup
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTabAndDuration}
                        multiMode={multiMode}
                        setMultiMode={setMultiMode}
                    />
                </Grid>
                <br />
                <Grid item xs={6} style={{ borderRight: "1px solid" }}>
                    <ChartDetailAutoCompleteIntervalGroup
                        assetData={assetData}
                        selectedAsset={selectedAsset}
                        updateSelectedAsset={updateSelectedAsset}
                        durations={constants.chartDetailDurationConstants[selectedTab]}
                        selectedDuration={selectedDuration}
                        setSelectedDuration={setSelectedDuration}
                        startEndTime={{ start: displayData.price[0].data[0].x, end: displayData.price[0].data[displayData.price[0].data.length - 1].x }}
                    />
                    <br />
                    <ChartDetailIntervalData
                        selectedAsset={selectedAsset}
                        historicalMarketData={displayData}
                    />
                    <br />
                    <ReactApexChart
                        options={constants.chartDetailLineGraph}
                        series={selectedTab === 3 ? displayData.marketCap : displayData.price}
                        type="line"
                        height={600}
                    />
                    <ReactApexChart
                        options={constants.chartDetailBarGraph}
                        series={displayData.volume}
                        type="bar"
                        height={200}
                    />
                </Grid>
                <Grid item xs={6} style={{ borderLeft: "1px solid" }}>
                    {renderSecondChart()}
                </Grid>
            </Grid>
        );
    };

    return (
        assetData && selectedAsset && historicalMarketData && displayData
        ? <div style={{ position: "absolute", left: 0, right: 0 }}>
            {multiMode ? renderMultiChart() : renderSingleChart()}
        </div>
        : <Loading />
    );
};