import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import * as helpers from '../../../../utils/helpers';

export default (props) => {
    const returnsData = [
        {
            name: "1H",
            value: props.assetData.market_data.price_change_percentage_1h_in_currency.usd,
        },
        {
            name: "24H",
            value: props.assetData.market_data.price_change_percentage_24h,
        },
        {
            name: "7D",
            value: props.assetData.market_data.price_change_percentage_7d,
        },
        {
            name: "14D",
            value: props.assetData.market_data.price_change_percentage_14d,
        },
        {
            name: "30D",
            value: props.assetData.market_data.price_change_percentage_30d,
        },
        {
            name: "60D",
            value: props.assetData.market_data.price_change_percentage_60d,
        },
        {
            name: "200D",
            value: props.assetData.market_data.price_change_percentage_200d,
        },
        {
            name: "1Y",
            value: props.assetData.market_data.price_change_percentage_1y,
        },
    ];

    return (
        <Paper>
            <Grid container>
                {returnsData.map((returnData, index) => {
                    return (
                        <Grid key={returnData.name + index} item xs style={{ border: "1px solid", textAlign: "center" }}>
                            <span style={{ textDecoration: "underline" }}>
                                {returnData.name}
                            </span>
                            <br />
                            <span style={{ color: helpers.greenOrRed(returnData.value) }}>
                                {returnData.value > 0
                                    ? <ArrowDropUpIcon style={{ verticalAlign: "middle" }} />
                                    : <ArrowDropDownIcon style={{ verticalAlign: "middle" }} />
                                }
                                {helpers.percentageFormatter(returnData.value)}
                            </span>
                        </Grid>
                    );
                })}
            </Grid>
        </Paper>
    );
};