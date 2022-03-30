import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import Grid from '@material-ui/core/Grid';
import LiveDetailCandlestickChart from './LiveDetailCandlestickChart';
import LiveDetailLineChart from './LiveDetailLineChart';
import LiveDetailAreaChart from './LiveDetailAreaChart';
import LiveDetailBarChart from './LiveDetailBarChart';
import LiveDetailAutoComplete from './LiveDetailAutoComplete';
import LiveDetailChartOptions from './LiveDetailChartOptions';
import LiveDetailDepthChart from './LiveDetailDepthChart';
import LiveDetailOrderBook from './LiveDetailOrderBook';
import LiveDetailRecentTrades from './LiveDetailRecentTrades';
import Loading from '../../components/Loading';
import * as binanceApi from '../../api/binanceApi';
import * as coingeckoApi from '../../api/coingeckoApi';
import * as constants from '../../utils/constants';
import * as helpers from '../../utils/helpers';

export default (props) => {
    const [ assetData, setAssetData ] = useState(null);
    const [ selectedAsset, setSelectedAsset ] = useState({});
    const [ OHLC, setOHLC ] = useState(null);
    const [ lineData, setLineData ] = useState(null);
    const [ volumeData, setVolumeData ] = useState(null);
    const [ orderBook, setOrderBook ] = useState(null);
    const [ recentTrades, setRecentTrades ] = useState(null);
    const [ chartType, setChartType ] = useState("candlestick");

    const socket = useRef(null);
    let history = useHistory();

    useEffect(() => {
        async function getCoinGeckoAssetList() {
            let coinGeckoAssetListResponse = await coingeckoApi.getCoingeckoAssetList();
            let updatedCoinList = coinGeckoAssetListResponse.data.filter(coin => constants.binanceCoins.includes(coin.symbol.toUpperCase()));
            // setAssetData(coinGeckoAssetListResponse.data);
            setAssetData(updatedCoinList);
            for (let asset of coinGeckoAssetListResponse.data) {
                if (asset.symbol === props.match.params.name) {
                    setSelectedAsset(asset);
                    break;
                };
            };
        };
        getCoinGeckoAssetList();
    }, []);

    useEffect(() => {
        if (selectedAsset && selectedAsset.symbol) {
            async function getBinanceOHLCOrderBookRecentTradesData() {
                let binanceOHLCResponse = await binanceApi.getBinanceOHLC(selectedAsset.symbol, "1m", 50);
                let formattedOHLC = [];
                let formattedLineData = [];
                let formattedVolumeData = [];
                binanceOHLCResponse.data.map((interval) => {
                    formattedOHLC.push({ x: new Date(interval[0]), y: interval.slice(1, 5) });
                    formattedLineData.push({ x: new Date(interval[0]), y: interval[4] });
                    formattedVolumeData.push({ x: new Date(interval[0]), y: interval[10] });
                });
                setOHLC(formattedOHLC);
                setLineData(formattedLineData);
                setVolumeData(formattedVolumeData);
                let binanceOrderBookDataResponse = await binanceApi.getBinanceOrderBook(selectedAsset.symbol);
                setOrderBook(() => binanceOrderBookDataResponse.data);
                let binanceRecentTradesResponse = await binanceApi.getBinanceRecentTrades(selectedAsset.symbol);
                setRecentTrades(() => binanceRecentTradesResponse.data);
            };
            async function getBinanceWebSocketOHLCOrderBookRecentTradesStream() {
                socket.current = binanceApi.newBinanceWebSocket();
                socket.current.onopen = () => socket.current.send(binanceApi.subscribeBinanceWebSocketOHLCOrderBookRecentTrades(selectedAsset.symbol));
                socket.current.onmessage = (msg) => {
                    let parsedData = JSON.parse(msg.data);
                    if (parsedData.e === "kline") {
                        let newOHLCData = {
                            x: new Date(parsedData.k.t),
                            y: [parsedData.k.o, parsedData.k.h, parsedData.k.l, parsedData.k.c],
                        };
                        let newLineData = {
                            x: new Date(parsedData.k.t),
                            y: parsedData.k.c,
                        };
                        let newVolumeData = {
                            x: new Date(parsedData.k.t),
                            y: parsedData.k.q,
                        };
                        setOHLC((prevState) => {
                            if (Date.parse(prevState[prevState.length - 1].x) === Date.parse(newOHLCData.x)) {
                                return [...prevState.slice(0, prevState.length - 1), newOHLCData];
                            };
                            return [...prevState.slice(1), newOHLCData];
                        });
                        setLineData((prevState) => {
                            if (Date.parse(prevState[prevState.length - 1].x) === Date.parse(newLineData.x)) {
                                return [...prevState.slice(0, prevState.length - 1), newLineData];
                            };
                            return [...prevState, newLineData];
                        });
                        setVolumeData((prevState) => {
                            if (Date.parse(prevState[prevState.length - 1].x) === Date.parse(newVolumeData.x)) {
                                return [...prevState.slice(0, prevState.length - 1), newVolumeData];
                            };
                            return [...prevState, newVolumeData];
                        });
                    };
                    if (parsedData.e === "trade") {
                        let newTrade = {
                            price: parsedData.p,
                            qty: parsedData.q,
                            time: parsedData.T,
                            isBuyerMaker: parsedData.m,
                            quoteQty: parsedData.p * parsedData.q,
                        };
                        setRecentTrades((prevState) => {
                            if (prevState.length > 10) {
                                return [newTrade, ...prevState.slice(0, 10)];
                            };
                            return [newTrade, ...prevState];
                        });
                    };
                    if (parsedData.asks !== null && parsedData.bids !== null && parsedData.lastUpdateId) {
                        setOrderBook(() => parsedData);
                    }
                    if (parsedData.e === "depthUpdate") {
                        let orderBookCopy = { ...orderBook };
                        orderBookCopy.lastUpdateId = parsedData.u;
                        parsedData.a.map((ask) => {
                            let isEditted = false;
                            if (parseFloat(ask[1]) === 0) {
                                orderBookCopy.asks.map((askCopy, index) => {
                                    if (ask[0] === askCopy[0]) {
                                        orderBookCopy.asks.splice(index, 1);
                                    };
                                });
                                isEditted = true;
                            } else {
                                orderBookCopy.asks.map((askCopy, index) => {
                                    if (ask[0] === askCopy[0]) {
                                        orderBookCopy.asks[index] = ask.slice(0);
                                        isEditted = true;
                                    };
                                });
                            };
                            if (!isEditted) {
                                orderBookCopy.asks.push(ask);
                            };
                        });
                        parsedData.b.map((bid) => {
                            let isEditted = false;
                            if (parseFloat(bid[1]) === 0) {
                                orderBookCopy.bids.map((bidCopy, index) => {
                                    if (bid[0] === bidCopy[0]) {
                                        orderBookCopy.bids.splice(index, 1);
                                    };
                                });
                                isEditted = true;
                            } else {
                                orderBookCopy.bids.map((bidCopy, index) => {
                                    if (bid[0] === bidCopy[0]) {
                                        orderBookCopy.bids[index] = bid.slice(0);
                                        isEditted = true;
                                    };
                                });
                            };
                            if (!isEditted) {
                                orderBookCopy.bids.push(bid);
                            };
                        });
                        function sortFunction(a, b) {
                            if (parseFloat(a[0]) === parseFloat(b[0])) {
                                return 0;
                            } else {
                                return (parseFloat(a[0]) < parseFloat(b[0])) ? -1 : 1;
                            };
                        };
                        function sortFunction2(a, b) {
                            if (parseFloat(a[0]) === parseFloat(b[0])) {
                                return 0;
                            } else {
                                return (parseFloat(a[0]) > parseFloat(b[0])) ? -1 : 1;
                            };
                        };
                        orderBookCopy.bids.sort(sortFunction2);
                        orderBookCopy.asks.sort(sortFunction);
                        // if (orderBookCopy.bids.length > 20) {
                        //     orderBookCopy.bids = orderBookCopy.bids.slice(0, 20);
                        // }
                        // if (orderBookCopy.asks.length > 20) {
                        //     orderBookCopy.asks = orderBookCopy.asks.slice(0, 20);
                        // }
                        setOrderBook(() => orderBookCopy);
                    };
                };
            };
            getBinanceOHLCOrderBookRecentTradesData();
            getBinanceWebSocketOHLCOrderBookRecentTradesStream();
            return () => {
                if (socket.current) {
                    socket.current.send(binanceApi.unsubscribeBinanceWebSocketOHLCOrderBookRecentTrades(selectedAsset.symbol));
                    socket.current.close();
                };
            };
        };
    }, [ selectedAsset ]);

    const updateSelectedAsset = (asset) => {
        history.push("/live/" + asset.symbol.toLowerCase());
        return setSelectedAsset(asset);
    };

    const renderSingleChart = () => {
        return (
            <Grid container spacing={4}>
                <Grid item xs={8}>
                    <Grid container>
                        <Grid item xs={3}>
                            <LiveDetailAutoComplete
                                assetData={assetData}
                                selectedAsset={selectedAsset}
                                updateSelectedAsset={updateSelectedAsset}
                            />
                        </Grid>
                        <Grid item xs={9}>
                            <LiveDetailChartOptions
                                chartType={chartType}
                                setChartType={setChartType}
                                assetLiveData={{
                                    asset: selectedAsset,
                                    price: recentTrades[0].price,
                                    color: recentTrades[0].price === recentTrades[1].price ? "" : recentTrades[0].price > recentTrades[1].price ? "green" : "red",
                                    start: helpers.formatFullDateWithTime(OHLC[0].x),
                                    end: helpers.formatFullDateWithTime(OHLC[OHLC.length - 1].x),
                                }}
                            />
                        </Grid>
                    </Grid>
                    {/* <div>
                        {helpers.formatFullDateWithTime(OHLC[0].x) + "-" + helpers.formatFullDateWithTime(OHLC[OHLC.length - 1].x)}
                    </div> */}
                    {chartType === "candlestick"
                        ? <LiveDetailCandlestickChart
                            options={constants.liveDetailCandlestickChartOptions}
                            series={[{ data: OHLC }]}
                        />
                        : chartType === "area"
                        ? <LiveDetailAreaChart
                            options={constants.liveDetailLineChartOptions}
                            series={[{ data: lineData }]}
                        />
                        : <LiveDetailLineChart
                            options={constants.liveDetailLineChartOptions}
                            series={[{ data: lineData }]}
                        />
                    }
                    <LiveDetailBarChart
                        options={constants.liveDetailBarChartOptions}
                        series={[{ data: volumeData }]}
                    />
                </Grid>
                <Grid item xs={4}>
                    <LiveDetailDepthChart orderBook={orderBook} />
                    <LiveDetailOrderBook orderBook={orderBook} />
                    <br />
                    <LiveDetailRecentTrades recentTrades={recentTrades} />
                </Grid>
            </Grid>
        );
    };

    return (
        assetData && selectedAsset && OHLC && lineData && volumeData && orderBook && recentTrades
        ? <div style={{ position: "absolute", left: 0, right: 0, width: "98%", marginLeft: "auto", marginRight: "auto" }}>
            {renderSingleChart()}
        </div>
        : <Loading />
    );
};