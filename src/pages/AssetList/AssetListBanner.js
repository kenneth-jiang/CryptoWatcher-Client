import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import * as helpers from '../../utils/helpers';

export default (props) => {
    return (
        <Paper style={{ padding: "16px", border: "1px solid", textAlign: "center" }}>
            <Grid container>
                <Grid item xs={3}>
                    <span style={{ textDecoration: "underline", fontWeight: "bold" }}>
                        Active Cryptocurrencies:
                    </span>
                    <br />
                    {props.globalData.active_cryptocurrencies}
                </Grid>
                <Grid item xs={2}>
                    <span style={{ textDecoration: "underline", fontWeight: "bold" }}>
                        Markets:
                    </span>
                    <br />
                    {props.globalData.markets}
                </Grid>
                <Grid item xs={4}>
                    <span style={{ textDecoration: "underline", fontWeight: "bold" }}>
                        Total Market Cap:
                    </span>
                    <br />
                    {helpers.currencyFormatter(props.globalData.total_market_cap.usd, 0, 2)}
                    <span style={{ color: helpers.greenOrRed(props.globalData.market_cap_change_percentage_24h_usd) }}>
                        {props.globalData.market_cap_change_percentage_24h_usd > 0
                            ? <ArrowDropUpIcon style={{ verticalAlign: "middle" }} />
                            : <ArrowDropDownIcon style={{ verticalAlign: "middle" }} />
                        }
                        {helpers.percentageFormatter(props.globalData.market_cap_change_percentage_24h_usd)}
                    </span>
                </Grid>
                <Grid item xs={3}>
                    <span style={{ textDecoration: "underline", fontWeight: "bold" }}>
                        Total Volume 24H:
                    </span>
                    <br />
                    {helpers.currencyFormatter(props.globalData.total_volume.usd, 0, 2)}
                </Grid>
            </Grid>
        </Paper>
    );
};