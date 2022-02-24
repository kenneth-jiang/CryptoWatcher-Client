import React, { useState } from 'react';
// import { useHistory } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import ReplayIcon from '@material-ui/icons/Replay';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import * as helpers from '../../../utils/helpers';

export default (props) => {
    const [ anchorEl, setAnchorEl ] = useState(null);
    const [ anchorEl2, setAnchorEl2 ] = useState(null);
    const [ anchorEl3, setAnchorEl3 ] = useState(null);
    const [ anchorEl4, setAnchorEl4 ] = useState(null);

    // let history = useHistory();
    
    const handleClick = (event, index) => {
        if (index === 0) {
            return setAnchorEl(event.currentTarget);
        } else if (index === 1) {
            return setAnchorEl2(event.currentTarget);
        } else if (index === 2) {
            return setAnchorEl3(event.currentTarget);
        } else if (index === 3) {
            return setAnchorEl4(event.currentTarget);
        };
    };

    const handleClose = () => {
        setAnchorEl(null);
        setAnchorEl2(null);
        setAnchorEl3(null);
        setAnchorEl4(null);
    };

    const treeMapConstants = [
        {
            name: "limit",
            data: [
                { label: "Top 10 Coins", value: 10 },
                { label: "Top 25 Coins", value: 25 },
                { label: "Top 50 Coins", value: 50 },
                { label: "Top 100 Coins", value: 100 },
                { label: "Top 200 Coins", value: 200 },
                // { label: "Top 300 Coins", value: 300 },
                // { label: "Top 400 Coins", value: 400 },
                { label: "Top 500 Coins", value: 500 },
            ],
        },
        {
            name: "group",
            data: [
                { label: "Sectors", value: "sectors" },
                { label: "Categories", value: "categories" },
                // { label: "Tags", value: "tags" },
                // { label: "Algorithm", value: "algorithm" },
                // { label: "Ungrouped", value: null },
            ],
        },
        {
            name: "show",
            data: [
                { label: "Market Cap", value: "marketcap" },
                { label: "Dominance", value: "dominance" },
                { label: "Price", value: "price" },
                { label: "Volume", value: "volume" },
                { label: "Top Gainers", value: "topGainers" },
                { label: "Top Losers", value: "topLosers" },
            ],
        },
        {
            name: "duration",
            data: [
                { label: "1 Hour", value: "1H" },
                { label: "1 Day", value: "1D" },
                { label: "1 Week", value: "1W" },
                { label: "1 Month", value: "1M" },
                { label: "1 Quarter", value: "1Q" },
                { label: "1 Year", value: "1Y" },
                { label: "Month to Date", value: "MTD" },
                { label: "Quarter to Date", value: "QTD" },
                { label: "Year to Date", value: "YTD" },
            ],
        },
    ];

    const options = {
        chart: {
            animations: {
                enabled: false
            },
            // events: {
            //     dataPointSelection: (event, chartContext, config) => {
            //         // let symbol = config.w.globals.initialSeries[config.seriesIndex].data[config.dataPointIndex].data.symbol;
            //         // return history.push("/coins/" + symbol.toLowerCase());
            //         if (config.w.globals.initialSeries.length === 1) {
            //             return props.setZoomed(false);
            //         }
            //         props.setZoomed(true);
            //         return props.updateSeriesData([config.w.globals.initialSeries[config.seriesIndex]]);
            //     },
            //     legendClick: (chartContext, seriesIndex, config) => {
            //         if (config.globals.initialSeries.length === 1) {
            //             return props.setZoomed(false);
            //         }
            //         props.setZoomed(true);
            //         return props.updateSeriesData([config.globals.initialSeries[seriesIndex]]);
            //     },
            // },
            toolbar: {
                show: false,
            },
        },
        legend: {
            show: true,
            showForSingleSeries: true,
        },
        dataLabels: {
            enabled: true,
            formatter: (text, options) => {
                let symbol = "(" + options.w.globals.initialSeries[options.seriesIndex].data[options.dataPointIndex].data.symbol + ")";
                let value = options.value;
                let label = options.w.globals.initialSeries[options.seriesIndex].data[options.dataPointIndex].data.show;
                if (["marketcap", "price", "volume", "dominance"].indexOf(label) !== -1) {
                    label = label[0].toUpperCase() + label.slice(1) + ":";
                } else if (["topGainers", "topLosers"].indexOf(label) !== -1) {
                    label = "Returns:"
                };
                if (["marketcap", "price", "volume"].indexOf(options.w.globals.initialSeries[options.seriesIndex].data[options.dataPointIndex].data.show) !== -1) {
                    value = helpers.currencyFormatter(value, 2, value > 2 ? 2 : 10) || "$0";
                    return [text + " " + symbol, label, value];
                } else {
                    value = helpers.percentageFormatter(value, 0, 2) || "0%";
                    return [text + " " + symbol, label + " " + value];
                };
            },
            offsetY: -4,
        },
        plotOptions: {
            treemap: {
                enableShades: false,
            },
        },
        tooltip: {
            y: {
                formatter: (value, options) => {
                    let label = options.w.globals.initialSeries[options.seriesIndex].data[options.dataPointIndex].data.show;
                    if (["marketcap", "price", "volume", "dominance"].indexOf(label) !== -1) {
                        label = label[0].toUpperCase() + label.slice(1) + ": ";
                        return label + helpers.currencyFormatter(value, 2, value > 2 ? 2 : 10) || "$0";
                    } else if (["topGainers", "topLosers"].indexOf(label) !== -1) {
                        label = "Returns: "
                        return label + helpers.percentageFormatter(value, 0, 2) || "0%";
                    };
                },
                title: {
                    formatter: (seriesName, options) => {
                        let symbol = options.w.globals.initialSeries[options.seriesIndex].data[options.dataPointIndex].data.symbol;
                        return seriesName + " (" + symbol + "):";
                    },
                }
            },
        },
    };
    
    return (
        <Paper elevation={4} style={{ height: "850px", padding: "30px 40px 30px 40px", border: "1px solid #D8D8D8", backgroundColor: "#FBFBFB" }}>
            <Grid container>
                <Grid item xs={2}>
                    {/* <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        disabled={!props.zoomed}
                        onClick={() => props.setZoomed(false)}
                    >
                        <ReplayIcon />
                    </Button>
                    &nbsp; */}
                    <Button
                        variant="contained"
                        color={props.blockColors === "default" ? "primary" : "inherit"}
                        size="small"
                        onClick={() => props.setBlockColors()}
                    >
                        <InvertColorsIcon />
                    </Button>
                </Grid>
                <Grid item xs={10}>
                    <Grid container spacing={1}>
                        {treeMapConstants.map((constant, index) => {
                            let currentAnchorEl;
                            if (index === 0) {
                                currentAnchorEl = anchorEl;
                            } else if (index === 1) {
                                currentAnchorEl = anchorEl2;
                            } else if (index === 2) {
                                currentAnchorEl = anchorEl3;
                            } else if (index === 3) {
                                currentAnchorEl = anchorEl4;
                            };
                            return (
                                <Grid item xs={3} key={constant + index} style={{ textAlign: "center" }}>
                                    <ButtonGroup
                                        style={{ width: "100%", backgroundColor: "rgba(0, 0, 0, 0.12)" }}
                                        // variant="outlined"
                                        // color="inherit"
                                        size="small"
                                        disabled={constant.name === "duration" && (["topGainers", "topLosers", "volume"].indexOf(props.show) === -1) || (constant.name === "limit" && ["volume"].indexOf(props.show) !== - 1 && [10, 25, 50].indexOf(props.limit) === -1)}
                                        onClick={(event) => {
                                            if (constant.name === "duration" && (["topGainers", "topLosers", "volume"].indexOf(props.show) === -1) || (constant.name === "limit" && ["volume"].indexOf(props.show) !== - 1  && [10, 25, 50].indexOf(props.limit) === -1)) {
                                                return;
                                            };
                                            return handleClick(event, index)
                                        }}
                                    >
                                        <Button style={{ width: "100%" }}>
                                            {constant.name}: {constant.data.map((ele) => {
                                                if (ele.value === props[constant.name]) {
                                                    return ele.label;
                                                }
                                            })}
                                        </Button>
                                        <Button>
                                            <ArrowDropDownIcon />
                                        </Button>
                                    </ButtonGroup>
                                    <Menu
                                        key={constant + index}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "center",
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "center",
                                        }}
                                        keepMounted
                                        getContentAnchorEl={null}
                                        anchorEl={currentAnchorEl}
                                        open={Boolean(currentAnchorEl)}
                                        onClose={handleClose}
                                    >
                                        {constant.data.map((data, index) => {
                                            return (
                                                <MenuItem
                                                    key={data + index}
                                                    style={{ justifyContent: "center" }}
                                                    disabled={(constant.name === "duration" && ((["marketcap", "dominance", "price"].indexOf(props.show) !== -1) || (props.show === "volume" && ["1H", "1D"].indexOf(data.value) === -1)))
                                                        || (constant.name === "limit" && ["volume"].indexOf(props.show) !== - 1 && [10, 25, 50].indexOf(data.value) === -1)}
                                                    onClick={() => {
                                                        props["set" + constant.name[0].toUpperCase() + constant.name.slice(1)](data.value);
                                                        handleClose();
                                                    }}
                                                >
                                                    {data.label}
                                                </MenuItem>
                                            );
                                        })}
                                    </Menu>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
            </Grid>
            <ReactApexChart
                options={options}
                series={props.series}
                type="treemap"
            />
        </Paper>
    );
};