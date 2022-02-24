import React from 'react';
// import { useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LandingPageBannerChart from './LandingPageBannerChart';
import * as helpers from '../../../utils/helpers';

export default (props) => {
    // let history = useHistory();

    return (
        <React.Fragment>
            <div>
                <div style={{ fontSize: "30px" }}>
                    Today's Cryptocurrency Market
                </div>
                {"The crypto market cap for today "}
                {helpers.getMonthDayYearFromTimeStamp(new Date(Date.now()).toJSON())}
                {" is "}
                <strong>
                    {helpers.currencyFormatter((props.globalData.data.total_market_cap.usd/1000000000000), 2, 2) + " trillion"}
                </strong>
                {" which is a "} 
                <span style={{ color: helpers.greenOrRed(props.globalData.data.market_cap_change_percentage_24h_usd) }}>
                    {helpers.percentageFormatter(props.globalData.data.market_cap_change_percentage_24h_usd, 1, 2)}
                </span>
                {props.globalData.data.market_cap_change_percentage_24h_usd > 0 ? " increase" : " decrease"}
                {" from yesterday's market cap. "}
                {"The total volume traded in the last 24 hours is "}
                <strong>
                    {helpers.currencyFormatter((props.globalData.data.total_volume.usd/1000000000), 2, 2) + " billion"}
                </strong>
                {"."}
            </div>
            <br />
            <Grid container spacing={2}>
                {props.bannerGraphs.map((bannerGraph, index) => {
                    return (
                        <Grid item xs={2} key={bannerGraph + index}>
                            <LandingPageBannerChart bannerGraphData={bannerGraph} />
                        </Grid>
                    );
                })}
                <Grid item xs={2}>
                    <Paper elevation={3} style={{ height: "106px", padding: "12px 16px 12px 16px", border: "1px solid #D8D8D8", backgroundColor: "#FBFBFB", alignItems: "center", overflow: "hidden" }}>
                        <strong style={{ fontSize: "20px", whiteSpace: "nowrap" }}>
                            Trending Coins
                        </strong>
                        <br />
                        {props.trendingCoins.coins.map((trendingCoin, index) => {
                            if (index < 3) {
                                return (
                                    <Grid container key={trendingCoin + index}>
                                        <Grid item xs={1}>
                                            {index + 1}
                                        </Grid>
                                        <Grid item xs={1}>
                                            <img style={{ height: "20px", width: "20px" }} src={trendingCoin.item.small} />
                                        </Grid>
                                        <Grid item xs={10}>
                                            &nbsp;
                                            <strong
                                                // style={{ cursor: "pointer" }}
                                                // onClick={() => history.push("/coins/" + trendingCoin.item.symbol.toLowerCase())}
                                            >
                                                {trendingCoin.item.name}
                                            </strong>
                                            &nbsp;
                                            ({trendingCoin.item.symbol})
                                        </Grid>
                                    </Grid>
                                );
                            };
                        })}
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};