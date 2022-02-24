import React from 'react';
import ReactApexChart from "react-apexcharts";
import * as helpers from '../../../../utils/helpers';

export default (props) => {
    const options = {
        chart: {
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },
        colors: ["#2E93fA", "#546E7A"],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "straight",
        },
        // title: {
        //     text: "24H Asset Data",
        // },
        legend: {
            show: false,
        },
        tooltip: {
            shared: true,
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
            labels: {
                rotate: 0,
                formatter: (value) => helpers.formatGraphDateLabel(value),
            },
        },
        yaxis: [
            {
                seriesName: "Price",
                axisBorder: {
                    show: true,
                },
                tickAmount: 8,
                labels: {
                    formatter: (value) => {
                        if (value > 2) {
                            return helpers.currencyFormatter(value, 2, 2);
                        }
                        return helpers.currencyFormatter(value, 2, 10);
                    },
                },
                min: parseFloat(props.OHLC.min) * .99,
                tooltip: {
                    enabled: true,
                },
            },
            {
                seriesName: "Volume",
                show: false,
                max: (value) => {
                    return value * 10;
                },
            },
        ]
    };

    return (
        <ReactApexChart
            options={options}
            series={props.OHLC.series}
            type="area"
            height={510}
        />
    );
};