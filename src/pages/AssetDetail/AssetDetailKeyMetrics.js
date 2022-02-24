import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import * as helpers from '../../utils/helpers';

export default (props) => {
    let keyMetricsData = [
        {
            name: "Price",
            value: helpers.currencyFormatter(props.assetData.market_data.current_price.usd, 2, 10),
        },
        {
            name: "Returns 24H",
            value: <React.Fragment>
                {helpers.currencyFormatter(props.assetData.market_data.price_change_24h, 2, 2)}
                <br />
                <span style={{ color: helpers.greenOrRed(props.assetData.market_data.price_change_percentage_24h) }}>
                    {props.assetData.market_data.price_change_percentage_24h.value > 0
                        ? <ArrowDropUpIcon style={{ verticalAlign: "middle" }} />
                        : <ArrowDropDownIcon style={{ verticalAlign: "middle" }} />
                    }
                    {helpers.percentageFormatter(props.assetData.market_data.price_change_percentage_24h)}
                </span>
            </React.Fragment>,
        },
        {
            name: "Low 24H",
            value: helpers.currencyFormatter(props.assetData.market_data.low_24h.usd, 2, 10),
        },
        {
            name: "High 24H",
            value: helpers.currencyFormatter(props.assetData.market_data.high_24h.usd, 2, 10),
        },
        {
            name: "Volume 24H",
            value: helpers.currencyFormatter(props.assetData.market_data.total_volume.usd, 2, 10),
        },
        {
            name: "Market Cap",
            value: helpers.currencyFormatter(props.assetData.market_data.market_cap.usd, 2, 2),
        },
        {
            name: "Market Dominance",
            value: helpers.percentageFormatter(((props.assetData.market_data.market_cap.usd) / (props.assetData.global.total_market_cap.usd)) * 100),
        },
        {
            name: "Market Rank",
            value: "#" + props.assetData.market_data.market_cap_rank,
        },
        {
            name: "Circulating Supply",
            value: helpers.numFormatter(props.assetData.market_data.circulating_supply),
        },
        {
            name: "Max Supply",
            value: helpers.numFormatter(props.assetData.market_data.max_supply),
        },
        {
            name: "Fully Diluted Valuation",
            value: helpers.currencyFormatter(props.assetData.market_data.fully_diluted_valuation.usd),
        },
        {
            name: <React.Fragment>
                All Time Low
                <br />
                <span style={{ fontSize: "smaller" }}>
                    ({helpers.getMonthDayYearFromTimeStamp(props.assetData.market_data.atl_date.usd)})
                </span>
            </React.Fragment>,
            value: <React.Fragment>
                {helpers.currencyFormatter(props.assetData.market_data.atl.usd, 2, 10)}
                <br />
                <span style={{ color: helpers.greenOrRed(props.assetData.market_data.atl_change_percentage.usd) }}>
                    {props.assetData.market_data.atl_change_percentage.usd > 0
                        ? <ArrowDropUpIcon style={{ verticalAlign: "middle" }} />
                        : <ArrowDropDownIcon style={{ verticalAlign: "middle" }} />
                    }
                    {helpers.percentageFormatter(props.assetData.market_data.atl_change_percentage.usd)}
                </span>
            </React.Fragment>
        },
        {
            name: <React.Fragment>
                All Time High
                <br />
                <span style={{ fontSize: "smaller" }}>
                    ({helpers.getMonthDayYearFromTimeStamp(props.assetData.market_data.ath_date.usd)})
                </span>
            </React.Fragment>,
            value: <React.Fragment>
                {helpers.currencyFormatter(props.assetData.market_data.ath.usd, 2, 10)}
                <br />
                <span style={{ color: helpers.greenOrRed(props.assetData.market_data.ath_change_percentage.usd) }}>
                    {props.assetData.market_data.ath_change_percentage.usd > 0
                        ? <ArrowDropUpIcon style={{ verticalAlign: "middle" }} />
                        : <ArrowDropDownIcon style={{ verticalAlign: "middle" }} />
                    }
                    {helpers.percentageFormatter(props.assetData.market_data.ath_change_percentage.usd)}
                </span>
            </React.Fragment>
        },
        {
            name: "Origin Date",
            value: helpers.getMonthDayYearFromTimeStamp(props.assetData.genesis_date),
        },
        {
            name: "Hashing Algorithm",
            value: props.assetData.hashing_algorithm,
        },
    ];

    return (
        <Paper style={{ border: "1px solid", padding: "8px", textAlign: "center" }}>
            <span style={{ textDecoration: "underline", fontWeight: "bold", fontSize: "larger" }}>
                Key Metrics
            </span>
            {keyMetricsData.map((keyMetricData, index) => {
                return (
                    <React.Fragment key={keyMetricData.name + index}>
                        <Grid container style={{ padding: "8px" }}>
                            <Grid item xs={6} style={{ textAlign: "left" }}>
                                {keyMetricData.name}
                            </Grid>
                            <Grid item xs={6} style={{ textAlign: "right" }}>
                                {keyMetricData.value || "No Data"}
                            </Grid>
                        </Grid>
                        {index !== keyMetricsData.length - 1 ? <Divider /> : null}
                    </React.Fragment>
                );
            })}
        </Paper>
    );
};