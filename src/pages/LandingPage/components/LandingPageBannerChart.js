import React, { useState } from 'react';
import ReactApexChart from "react-apexcharts";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import * as helpers from '../../../utils/helpers';

export default (props) => {
    const [ hoverValue, setHoverValue ] = useState({ x: null, y: null });

    const options = {
        chart: {
            animations: {
                enabled: false,
            },
            events: {
                dataPointMouseEnter: (event, chartContext, config) => {
                    return setHoverValue(() => config.w.globals.initialSeries[0].data[config.dataPointIndex]);
                },
                mounted: (chartContext, config) => {
                    return setHoverValue(() => config.globals.initialSeries[0].data[config.globals.initialSeries[0].data.length - 1]);
                },
            },
            sparkline: {
                enabled: true,
            },
        },
        colors: [
            props.bannerGraphData.color,
        ],
        markers: {
            size: 4,
            strokeColors: props.bannerGraphData.color,
            hover: {
                sizeOffset: 10,
            }
        },
        tooltip: {
            enabled: false,
            intersect: true,
            shared: false,
        },
    };

    return (
        <Paper elevation={3} style={{ border: "1px solid" + props.bannerGraphData.color, backgroundColor: "#FBFBFB", overflow: "hidden" }}>
            <Grid container style={{ height: "30px" }}>
                <Grid item xs={6} style={{ padding: "12px 0px 0px 16px", whiteSpace: "nowrap", color: props.bannerGraphData.color, fontSize: "20px" }}>
                    <strong>
                        {props.bannerGraphData.name}
                    </strong>
                </Grid>
                <Grid item xs={6} style={{ padding: "16px 16px 0px 0px", textAlign: "right" }}>
                    <strong>
                        {helpers[props.bannerGraphData.type + "Formatter"](hoverValue.y, 0, 1)}
                    </strong>
                </Grid>
                <Grid item xs={6} style={{ padding: "0px 0px 0px 16px", color: props.bannerGraphData.color }}>
                    <strong style={{ position: "relative", bottom: -60 }}>
                        {hoverValue.x ? helpers.getMonthDayYearFromTimeStamp((new Date(hoverValue.x).toJSON())) : null}
                    </strong>
                </Grid>
                <Grid item xs={6} style={{ padding: "0px 16px 0px 0px", color: props.bannerGraphData.color, textAlign: "right" }}>
                    <strong style={{ position: "relative", bottom: -60 }}>
                        30d
                    </strong>
                </Grid>
            </Grid>
            <ReactApexChart
                options={options}
                series={[{ data: props.bannerGraphData.series }]}
                type="area"
                height={100}
            />
        </Paper>
    );
};