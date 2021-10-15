import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LandingPageBanner from './components/LandingPageBanner';
import LandingPageTreeMap from './components/LandingPageTreeMap';
import LandingPageNewsArticlesList from './components/LandingPageNewsArticlesList';
import Loading from '../../components/Loading';
import { setGlobalData, setBannerGraphs, setTrendingCoins, setZoomed, setBlockColors, setLimit, setGroup, setShow, setDuration, setTreeMapData, updateSeriesData, setNewsArticles } from '../../redux/pageSlices/landingPageSlice';

export default () => {
    const dispatch = useDispatch();
    const coingecko = useSelector((state) => state.coingecko);
    const cryptocompare = useSelector((state) => state.cryptocompare);
    const lunarcrush = useSelector((state) => state.lunarcrush);
    const messari = useSelector((state) => state.messari);
    const landingPage = useSelector((state) => state.landingPage);
    
    useEffect(() => {
        if (coingecko.globalData && !landingPage.globalData) {
            dispatch(setGlobalData(coingecko.globalData));
        };
        if (coingecko.trendingCoins && !landingPage.trendingCoins) {
            dispatch(setTrendingCoins(coingecko.trendingCoins));
        };
    }, [ coingecko ]);

    useEffect(() => {
        if (cryptocompare.newsArticles) {
            dispatch(setNewsArticles(cryptocompare.newsArticles.Data));
        }
    }, [ cryptocompare ]);

    useEffect(() => {
        if (lunarcrush.globalData) {
            dispatch(setBannerGraphs(lunarcrush.globalData.data));
        };
    }, [ lunarcrush ]);

    useEffect(() => {
        if (messari.allCoins) {
            dispatch(setTreeMapData(messari.allCoins));
            dispatch(updateSeriesData());
        }
    }, [ messari ]);

    return (
        landingPage.globalData && landingPage.bannerGraphs && landingPage.trendingCoins && landingPage.seriesData && landingPage.newsArticles
        ? <Container maxWidth="xl">
            <LandingPageBanner
                globalData={landingPage.globalData}
                bannerGraphs={landingPage.bannerGraphs}
                trendingCoins={landingPage.trendingCoins}
            />
            <br />
            <Grid container spacing={3}>
                <Grid item xs={9}>
                    <LandingPageTreeMap
                        zoomed={landingPage.zoomed}
                        setZoomed={(action) => {
                            dispatch(setZoomed(action))
                            dispatch(updateSeriesData());
                        }}
                        blockColors={landingPage.blockColors}
                        setBlockColors={() => {
                            dispatch(setBlockColors())
                            dispatch(updateSeriesData());
                        }}
                        limit={landingPage.limit}
                        setLimit={(action) => {
                            dispatch(setLimit(action));
                            dispatch(updateSeriesData());
                        }}
                        group={landingPage.group}
                        setGroup={(action) => {
                            dispatch(setGroup(action));
                            dispatch(updateSeriesData());
                        }}
                        show={landingPage.show}
                        setShow={(action) => {
                            dispatch(setShow(action))
                            dispatch(updateSeriesData());
                        }}
                        duration={landingPage.duration}
                        setDuration={(action) => {
                            dispatch(setDuration(action))
                            dispatch(updateSeriesData());
                        }}
                        series={landingPage.seriesData}
                        updateSeriesData={(value) => dispatch(updateSeriesData(value))}
                    />
                </Grid>
                <Grid item xs={3}>
                    <LandingPageNewsArticlesList newsArticles={landingPage.newsArticles} />
                </Grid>
            </Grid>
        </Container>
        : <Loading />
    );
};