import React from 'react';
import ReactApexChart from "react-apexcharts";
import * as helpers from '../../../../utils/helpers';
import * as constants from '../../../../utils/constants';

export default (props) => {
    const lineGraphOptions = {
        chart: {
            id: "CoinPrice",
            group: "CoinDetail",
            animations: {
                enabled: false,
            },
        },
        grid: {
            xaxis: {
                lines: {
                    show: true,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "straight",
        },
        tooltip: {
            shared: true,
            intersect: false,
            x: {
                formatter: (value) => helpers.formatGraphDateTooltip(value),
            },
            y: {
                formatter: (value) => {
                    if (value > 2) {
                        return helpers.currencyFormatter(value, 2, 2);
                    }
                    return helpers.currencyFormatter(value, 2, 10);
                },
            },
        },
        xaxis: {
            type: "datetime",
            tickAmount: 8,
            tickPlacement: "on",
            crosshairs: {
                show: true,
                stroke: {
                    color: "red",
                    width: "1px",
                    dashArray: 0,
                },
            },
        },
        yaxis: {
            seriesName: "CoinPrice",
            axisBorder: {
                show: true,
            },
            labels: {
                formatter: (value) => {
                    if (value > 2) {
                        return helpers.currencyFormatter(value, 2, 2);
                    }
                    return helpers.currencyFormatter(value, 2, 10);
                },
                minWidth: 100,
            },
            tooltip: {
                enabled: true,
            },
            crosshairs: {
                show: true,
                stroke: {
                    color: "red",
                    width: "1px",
                }
            },
        },
    };

    return (
        <React.Fragment>
            <ReactApexChart
                options={constants.chartDetailLineGraph}
                series={props.viewData.price}
                type="area"
                height={600}
            />
            <ReactApexChart
                options={constants.chartDetailBarGraph}
                series={props.viewData.volume}
                type="bar"
                height={200}
            />
        </React.Fragment>
    );
};