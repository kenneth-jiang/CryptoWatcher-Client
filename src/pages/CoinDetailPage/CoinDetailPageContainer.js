import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from "@material-ui/core/Container";
import Loading from '../../components/Loading';
import CoinDetailPageAutocomplete from './components/CoinDetailPageAutocomplete';
import CoinDetailPageTabs from './components/CoinDetailPageTabs';
import CoinDetailPageMetadata from './Metadata/CoinDetailPageMetadata';
import CoinDetailPageChart from './Chart/CoinDetailPageChart';
import CoinDetailPageHolders from './Holders/CoinDetailPageHolders';
import LiveDetailContainer from '../LiveDetail/LiveDetailContainer';
import { setCoingeckoAllCoins, setBinanceCoinOHLC, setCoingeckoCoinMetadata, setCoingeckoCoinHistoricalData, setMessariCoinMetadata, setSelectedCoin, setSelectedTab, updateSelectedInterval, updateSelectedDuration, updateViewData, formatCoinHoldersData, setLoading } from '../../redux/pageSlices/coinDetailPageSlice';
import { getBinanceCoinOHLC } from '../../redux/apiSlices/binanceSlice';
import { getCoingeckoCoinMetadata, getCoingeckoCoinHistoricalData } from '../../redux/apiSlices/coingeckoSlice';
import { getMessariCoinMetadata } from '../../redux/apiSlices/messariSlice';
import CoinDetailPageRoadmap from './Roadmap/CoinDetailPageRoadmap';

export default (props) => {
    const dispatch = useDispatch();
    const coinDetailPage = useSelector((state) => state.coinDetailPage);
    const binance = useSelector((state) => state.binance);
    const coingecko = useSelector((state) => state.coingecko);
    const messari = useSelector((state) => state.messari);

    let history = useHistory();

    useEffect(() => {
        if (coingecko.allCoins) {
            dispatch(setCoingeckoAllCoins(coingecko.allCoins));
        };
    }, [ coingecko.allCoins ]);

    useEffect(() => {
        if (coinDetailPage.coingeckoAllCoins) {
            dispatch(setSelectedCoin(props.match.params.symbol));
        };
    }, [ coinDetailPage.coingeckoAllCoins ]);

    useEffect(() => {
        dispatch(setLoading());
        if (coinDetailPage.selectedCoin && !binance.coinOHLC[coinDetailPage.selectedCoin.symbol]) {
            dispatch(getBinanceCoinOHLC({ symbol: coinDetailPage.selectedCoin.symbol, interval: "3m", limit: 480 }));
        };
        if (coinDetailPage.selectedCoin && binance.coinOHLC[coinDetailPage.selectedCoin.symbol]) {
            dispatch(setBinanceCoinOHLC(binance.coinOHLC[coinDetailPage.selectedCoin.symbol]));
        };
        if (coinDetailPage.selectedCoin && !coingecko.coinMetadata[coinDetailPage.selectedCoin.symbol]) {
            dispatch(getCoingeckoCoinMetadata(coinDetailPage.selectedCoin.id));
        };
        if (coinDetailPage.selectedCoin && coingecko.coinMetadata[coinDetailPage.selectedCoin.symbol]) {
            dispatch(setCoingeckoCoinMetadata(coingecko.coinMetadata[coinDetailPage.selectedCoin.symbol]));
        };
        if (coinDetailPage.selectedCoin && !coingecko.coinHistoricalData[coinDetailPage.selectedCoin.symbol]) {
            dispatch(getCoingeckoCoinHistoricalData({
                coin: coinDetailPage.selectedCoin.id,
                symbol: coinDetailPage.selectedCoin.symbol,
                interval: coinDetailPage.selectedInterval,
            }));
        };
        if (coinDetailPage.selectedCoin && coingecko.coinHistoricalData[coinDetailPage.selectedCoin.symbol]) {
            if (coingecko.coinHistoricalData[coinDetailPage.selectedCoin.symbol][coinDetailPage.selectedInterval]) {
                dispatch(getCoingeckoCoinHistoricalData({
                    coin: coinDetailPage.selectedCoin.id,
                    symbol: coinDetailPage.selectedCoin.symbol,
                    interval: coinDetailPage.selectedInterval,
                }));
            };
        };
        if (coinDetailPage.selectedCoin && !messari.coinMetadata[coinDetailPage.selectedCoin.symbol]) {
            dispatch(getMessariCoinMetadata(coinDetailPage.selectedCoin.symbol));
        };
        if (coinDetailPage.selectedCoin && messari.coinMetadata[coinDetailPage.selectedCoin.symbol]) {
            dispatch(setMessariCoinMetadata(messari.coinMetadata[coinDetailPage.selectedCoin.symbol]));
        };
    }, [ coinDetailPage.selectedCoin ]);
    
    useEffect(() => {
        if (coinDetailPage.selectedCoin && binance.coinOHLC[coinDetailPage.selectedCoin.symbol]) {
            dispatch(setBinanceCoinOHLC(binance.coinOHLC[coinDetailPage.selectedCoin.symbol]));
        }
    }, [ binance.coinOHLC ]);

    useEffect(() => {
        if (coinDetailPage.selectedCoin && coingecko.coinMetadata[coinDetailPage.selectedCoin.symbol]) {
            dispatch(setCoingeckoCoinMetadata(coingecko.coinMetadata[coinDetailPage.selectedCoin.symbol]));
        }
    }, [ coingecko.coinMetadata ]);

    useEffect(() => {
        if (coinDetailPage.selectedCoin && coingecko.coinHistoricalData[coinDetailPage.selectedCoin.symbol]) {
            dispatch(setCoingeckoCoinHistoricalData(coingecko.coinHistoricalData[coinDetailPage.selectedCoin.symbol][coinDetailPage.selectedInterval]));
            dispatch(updateViewData());
        }
    }, [ coingecko.coinHistoricalData ]);

    useEffect(() => {
        if (coinDetailPage.selectedCoin && messari.coinMetadata[coinDetailPage.selectedCoin.symbol]) {
            dispatch(setMessariCoinMetadata(messari.coinMetadata[coinDetailPage.selectedCoin.symbol]));
        }
    }, [ messari.coinMetadata ]);

    useEffect(() => {
        if (coinDetailPage.selectedCoin && coingecko.coinHistoricalData[coinDetailPage.selectedCoin.symbol]) {
            if (!coingecko.coinHistoricalData[coinDetailPage.selectedCoin.symbol][coinDetailPage.selectedInterval]) {
                dispatch(getCoingeckoCoinHistoricalData({
                    coin: coinDetailPage.selectedCoin.id,
                    symbol: coinDetailPage.selectedCoin.symbol,
                    interval: coinDetailPage.selectedInterval,
                }));
            };
        };
    }, [ coinDetailPage.selectedInterval ]);

    useEffect(() => {
        dispatch(setLoading());
        dispatch(updateViewData());
    }, [ coinDetailPage.selectedInterval, coinDetailPage.selectedDuration ]);

    useEffect(() => {
        if (coinDetailPage.messariMetadata) {
            dispatch(formatCoinHoldersData(coinDetailPage.messariMetadata));
        }
    }, [ coinDetailPage.messariMetadata]);

    return (
        <React.Fragment>
            <Container>
                <div style={{ display: "flex" }}>
                    {coinDetailPage.coingeckoAllCoins && coinDetailPage.selectedCoin
                    ? <CoinDetailPageAutocomplete
                        assetData={coinDetailPage.coingeckoAllCoins}
                        selectedAsset={coinDetailPage.selectedCoin}
                        setSelectedCoin={(coin) => {
                            history.push("/coins/" + coin.symbol.toLowerCase());
                            dispatch(setSelectedCoin(coin.symbol));
                        }}
                    />
                    : null}
                    <div style={{ flexGrow: 1 }} />
                    <CoinDetailPageTabs
                        selectedTab={coinDetailPage.selectedTab}
                        setSelectedTab={(tab) => dispatch(setSelectedTab(tab))}
                    />
                </div>
            </Container>
            
            <br />

            {coinDetailPage.selectedTab === 0 && 
                (coinDetailPage.coingeckoMetadata && coinDetailPage.binanceOHLC && coinDetailPage.messariMetadata && !coinDetailPage.loading
                ? <Container>
                    <CoinDetailPageMetadata 
                        metadata={coinDetailPage.coingeckoMetadata}
                        OHLC={coinDetailPage.binanceOHLC}
                        messariMetadata={coinDetailPage.messariMetadata}
                    />
                </Container>
                : <Loading />)
            }

            {coinDetailPage.selectedTab === 1 && 
                (coinDetailPage.coingeckoHistoricalData[coinDetailPage.selectedInterval] && coinDetailPage.viewData && !coinDetailPage.loading
                ? <Container>
                    <CoinDetailPageChart
                        historicalData={coinDetailPage.coingeckoHistoricalData[coinDetailPage.selectedInterval]}
                        viewData={coinDetailPage.viewData}
                        updateViewData={() => dispatch(updateViewData())}
                        selectedCoin={coinDetailPage.selectedCoin}
                        selectedInterval={coinDetailPage.selectedInterval}
                        selectedDuration={coinDetailPage.selectedDuration}
                        updateSelectedInterval={(interval) => dispatch(updateSelectedInterval(interval))}
                        updateSelectedDuration={(duration) => dispatch(updateSelectedDuration(duration))}
                    />
                </Container>
                : <Loading />)
            }
            
            {/* {coinDetailPage.selectedTab === 2
            && <LiveDetailContainer {...props} />}

            {coinDetailPage.selectedTab === 3 && coinDetailPage.coinHoldersData
            && <CoinDetailPageHolders
                coinHoldersData={coinDetailPage.coinHoldersData}
            />} */}
        </React.Fragment>
    );
};