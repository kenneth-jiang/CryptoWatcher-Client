import React from 'react';
import ReactApexChart from "react-apexcharts";

export default (props) => {
    return (
        <ReactApexChart
            options={props.options}
            series={props.series}
            type={"candlestick"}
            height={800}
        />
    );
};