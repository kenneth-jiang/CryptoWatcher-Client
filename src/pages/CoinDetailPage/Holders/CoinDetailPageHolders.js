import React from 'react';
import ReactApexChart from 'react-apexcharts';
import Grid from '@material-ui/core/Grid'
import * as helpers from '../../../utils/helpers';

export default (props) => {
    return (
        <Grid container>
            <Grid item xs={8}>
                <ReactApexChart
                    options={{
                        chart: {
                            type: 'bar',
                            height: 430
                        },
                        dataLabels: {
                            enabled: false,
                            textAnchor: 'start',
                            offsetX: -6,
                            style: {
                                fontSize: '12px',
                                colors: ['#fff']
                            },
                            formatter: function (val, opt) {
                                // return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
                                return val
                            },
                        },
                        grid: {
                            xaxis: {
                                lines: {
                                    show: true,
                                }
                            },
                            yaxis: {
                                lines: {
                                    show: true,
                                }
                            },
                        },
                        // stroke: {
                        //     show: true,
                        //     width: 1,
                        //     colors: ['#fff']
                        // },
                        tooltip: {
                            shared: true,
                            intersect: false,
                            y: {
                                formatter: (val) => {
                                    return helpers.numFormatter(val, 0, 0);
                                },
                                title: {
                                    formatter: (seriesName) => seriesName,
                                },
                            },
                        },
                        yaxis: {
                            tickPlacement: "on",
                            tickAmount: 10,
                            labels: {
                                formatter: (val) => {
                                    return helpers.abbreviateLargeNums(val);
                                },
                            }
                        },
                    }}
                    series={[{ name: "# of Addresses", data: props.coinHoldersData.address.units }, { name: "# of Coins", data: props.coinHoldersData.supply.units }]}
                    type="bar"
                />
            </Grid>
            <Grid item xs={4}>
                Number of Addresses
            </Grid>
        </Grid>
    );
};