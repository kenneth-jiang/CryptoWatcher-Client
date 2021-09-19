import React from 'react';
import ReactApexChart from "react-apexcharts";
import * as helpers from '../../utils/helpers';

export default (props) => {
    let askArray = [];
    let bidArray = [];
    let bidsCount = 0;
    let asksCount = 0;
    props.orderBook.bids.map((bid) => {
        askArray.push({ x: parseFloat(bid[0]), y: null });
        bidArray.push({ x: parseFloat(bid[0]), y: parseFloat(bid[1]) + parseFloat(bidsCount) });
        bidsCount = parseFloat(bid[1]) + parseFloat(bidsCount)
    });
    props.orderBook.asks.map((ask) => {
        bidArray.push({ x: parseFloat(ask[0]), y: null });
        askArray.push({ x: parseFloat(ask[0]), y: parseFloat(ask[1]) + parseFloat(asksCount) });
        asksCount = parseFloat(ask[1]) + parseFloat(asksCount);
    });
    let largerSeries = bidsCount > asksCount ? "Bids" : "Asks";

    return (
        <ReactApexChart
            options={{
                chart: {
                    animations: {
                        enabled: false,
                    },
                    toolbar: {
                        show: false,
                    },
                    zoom: {
                        enabled: false,
                    },
                },
                colors: ["#00aa40", "#e8093a"],
                dataLabels: {
                    enabled: false,
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
                legend: {
                    onItemClick: {
                        toggleDataSeries: false,
                    },
                },
                stroke: {
                    curve: "straight",
                },
                title: {
                    text: "Depth Chart",
                    align: "center",
                },
                tooltip: {
                    x: {
                        show: false,
                    },
                },
                xaxis: {
                    type: "numeric",
                    tickPlacement: "on",
                    labels: {
                        formatter: (val) => {
                            return helpers.currencyFormatter(val, 2, val > 2 ? 2 : 6);
                        },
                    },
                    crosshairs: {
                        show: true,
                        stroke: {
                            color: "blue",
                            width: "1px",
                        }
                    },
                },
                yaxis: [
                    {
                        seriesName: largerSeries,
                        labels: {
                            formatter: (val) => {
                                return helpers.numFormatter(val, 0, 1);
                            },
                        },
                        tooltip: {
                            enabled: true,
                        },
                        crosshairs: {
                            show: true,
                            position: "front",
                            stroke: {
                                color: "blue",
                                width: "1px",
                            }
                        },
                    },
                    {
                        seriesName: largerSeries,
                        opposite: true,
                        labels: {
                            formatter: (val) => {
                                return helpers.numFormatter(val, 0, 1);
                            },
                        },
                        tooltip: {
                            enabled: true,
                        },
                        crosshairs: {
                            show: true,
                            stroke: {
                                color: "blue",
                                width: "1px",
                            }
                        },
                    },
                ]
            }}
            series={[
                {
                    name: "Bids",
                    data: bidArray,
                },
                {
                    name: "Asks",
                    data: askArray,
                },
            ]}
            type="area"
            height={250}
        />
    );
};