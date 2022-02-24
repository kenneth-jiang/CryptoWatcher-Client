import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import * as helpers from '../../utils/helpers';

export default (props) => {
    const calculateStartEnd = (value) => {
        let startEndObj = {};
        if (value === "date") {
            startEndObj.start = props.historicalMarketData.price[0].data[0].x;
            startEndObj.end = props.historicalMarketData.price[0].data[props.historicalMarketData.price[0].data.length - 1].x;
            return startEndObj;
        }
        startEndObj.start = props.historicalMarketData[value][0].data[0].y;
        startEndObj.end = props.historicalMarketData[value][0].data[props.historicalMarketData[value][0].data.length - 1].y;
        return startEndObj;
    };

    return (
        <Grid container style={{ textAlign: "center" }}>
            <Grid item xs={3}>
                <img src={props.selectedAsset.image} style={{ height: "30px", width: "30px" }} />
                &nbsp;&nbsp;
                <span style={{ fontSize: "30px"}}>
                    <strong>{props.selectedAsset.name}</strong>
                </span>
                &nbsp;
                <span style={{ fontSize: "25px" }}>
                    ({props.selectedAsset.symbol.toUpperCase()})
                </span>
            </Grid>
            <Grid item xs={3}>
                <strong style={{ fontSize: "larger", textDecoration: "underline" }}>Price</strong>
                <br />
                <strong>Start:</strong> {helpers.currencyFormatter(calculateStartEnd("price").start)}
                <br />
                <strong>End:</strong> {helpers.currencyFormatter(calculateStartEnd("price").end)}
                <br />
                {/* <strong>Time Elapsed: </strong> {timeInBetween(calculateStartEnd("date").start, calculateStartEnd("date").end)} */}
            </Grid>
            <Grid item xs={3}>
                <strong style={{ fontSize: "larger", textDecoration: "underline" }}>Market Cap</strong>
                <br />
                <strong>Start:</strong> {helpers.currencyFormatter(calculateStartEnd("marketCap").start)}
                <br />
                <strong>End:</strong> {helpers.currencyFormatter(calculateStartEnd("marketCap").end)}
                <br />
                {/* <strong>Time Elapsed: </strong> {timeInBetween(calculateStartEnd("date").start, calculateStartEnd("date").end)} */}
            </Grid>
            <Grid item xs={3}>
                <strong style={{ fontSize: "larger", textDecoration: "underline" }}>Volume</strong>
                <br />
                <strong>Start:</strong> {helpers.currencyFormatter(calculateStartEnd("volume").start)}
                <br />
                <strong>End:</strong> {helpers.currencyFormatter(calculateStartEnd("volume").end)}
                <br />
                {/* <strong>Time Elapsed: </strong> {timeInBetween(calculateStartEnd("date").start, calculateStartEnd("date").end)} */}
            </Grid>
        </Grid>
    );
};