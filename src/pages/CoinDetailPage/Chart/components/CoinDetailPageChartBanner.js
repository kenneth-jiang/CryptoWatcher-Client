import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import * as helpers from '../../../../utils/helpers';

export default (props) => {
    const [selectedButton, setSelectedButton] = useState("price");

    const buttonGroupNames = [
        { name: "Price", value: "price" }, 
        { name: "Market Cap", value: "marketCap" },
        { name: "Volume", value: "volume" },
    ];

    const StyledTooltip = withStyles((theme) => ({
        tooltip: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
        },
    }))(Tooltip);

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

    const calculateHighLow = (value) => {
        let highLowObj = {
            high: {
                value: 0,
                date: "",
            },
            low: {
                value: Infinity,
                date: "",
            },
        };
        props.historicalMarketData[value][0].data.map((ele) => {
            if (ele.y >= highLowObj.high.value) {
                highLowObj.high.value = ele.y;
                highLowObj.high.date = ele.x;
            } else if (ele.y <= highLowObj.low.value) {
                highLowObj.low.value = ele.y;
                highLowObj.low.date = ele.x;
            };
        });
        return highLowObj;
    };

    return (
        <Grid container>
            <Grid item xs={3}>
                <ButtonGroup color="primary" style={{ padding: "3px", textAlign: "right" }}>
                    {buttonGroupNames.map((buttonName, index) => {
                        return (
                            <Button
                                key={buttonName + index}
                                size="small"
                                variant={selectedButton === buttonName.value ? "contained" : "outlined"}
                                onClick={() => setSelectedButton(buttonName.value)}
                            >
                                {buttonName.name}    
                            </Button>
                        );
                    })}
                </ButtonGroup>
            </Grid>
            <Grid item xs style={{ textAlign: "left" }}>
                <StyledTooltip
                    placement="bottom-start"
                    title={helpers.formatFullDateWithTime(props.startEndTime.start)}
                >
                    <span style={{ cursor: "pointer" }}>
                        <strong style={{ textDecoration: "underline" }}>Start:</strong>
                        <br />
                        {helpers.currencyFormatter(calculateStartEnd(selectedButton).start)}
                    </span>
                </StyledTooltip>
            </Grid>
            <Grid item xs style={{ textAlign: "left" }}>
                <StyledTooltip
                    placement="bottom-start"
                    title={helpers.formatFullDateWithTime(props.startEndTime.end)}
                >
                    <span style={{ cursor: "pointer" }}>
                        <strong style={{ textDecoration: "underline" }}>End:</strong>
                        <br />
                        {helpers.currencyFormatter(calculateStartEnd(selectedButton).end)}
                    </span>
                </StyledTooltip>
            </Grid>
            <Grid item xs style={{ textAlign: "left" }}>
                <strong style={{ textDecoration: "underline" }}>% Change:</strong>
                <br />
                <span style={{ color: helpers.greenOrRed((calculateStartEnd(selectedButton).end - calculateStartEnd(selectedButton).start) / (calculateStartEnd(selectedButton).start))}}>
                    {(calculateStartEnd(selectedButton).end - calculateStartEnd(selectedButton).start) / (calculateStartEnd(selectedButton).start) > 0 ? "+" : null}
                    {helpers.percentageFormatter((calculateStartEnd(selectedButton).end - calculateStartEnd(selectedButton).start) / (calculateStartEnd(selectedButton).start) * 100, 2, 2)}
                </span>
            </Grid>
            <Grid item xs style={{ textAlign: "left" }}>
                <StyledTooltip
                    placement="bottom-start"
                    title={helpers.formatFullDateWithTime(calculateHighLow(selectedButton).high.date)}
                >
                    <span style={{ cursor: "pointer" }}>
                        <strong style={{ textDecoration: "underline" }}>High:</strong>
                        <br />
                        {helpers.currencyFormatter(calculateHighLow(selectedButton).high.value)}
                    </span>
                </StyledTooltip>
            </Grid>
            <Grid item xs style={{ textAlign: "left" }}>
                <StyledTooltip
                    placement="bottom-start"
                    title={helpers.formatFullDateWithTime(calculateHighLow(selectedButton).low.date)}
                >
                    <span style={{ cursor: "pointer" }}>
                        <strong style={{ textDecoration: "underline" }}>Low:</strong>
                        <br />
                        {helpers.currencyFormatter(calculateHighLow(selectedButton).low.value)}
                    </span>
                </StyledTooltip>
            </Grid>
            <Grid item xs={2} style={{ textAlign: "right" }}>
                <span style={{ fontSize: "smaller" }}>
                    <strong>From: </strong><span style={{ textDecoration: "underline" }}>{helpers.formatFullDateWithTime(props.startEndTime.start)}</span>
                    <br />
                    <strong>To: </strong><span style={{ textDecoration: "underline" }}>{helpers.formatFullDateWithTime(props.startEndTime.end)}</span>
                </span>
            </Grid>
        </Grid>
    );
};