import * as helpers from './helpers';

export const navBarConstants = {
    title: {
        bold: "CRYPTO",
        plain: "WATCHER",
    },
    links: [
        {
            name: "Assets",
            to: "/assets",
            authRequired: false,
        },
        {
            name: "Chart",
            to: "/chart",
            authRequired: false,
        },
        {
            name: "Live",
            to: "/live",
            authRequired: false,
        },
        {
            name: "Order",
            to: "/order",
            authRequired: true,
        }
    ],
};

export const chartDetailMinutelyDurationConstants = [
    { name: "3H", value: 45 },
    { name: "6H", value: 90 },
    { name: "12H", value: 180 },
    { name: "1D", value: 360 },
];

export const chartDetailHourlyDurationConstants = [
    { name: "1D", value: 24 },
    { name: "3D", value: 72 },
    { name: "1W", value: 168 },
    { name: "2W", value: 336 },
    { name: "1M", value: 720 },
];

export const chartDetailDailyDurationConstants = [
    { name: "1M", value: 30 },
    { name: "3M", value: 90 },
    { name: "6M", value: 180 },
    { name: "1Y", value: 365 },
    { name: "3Y", value: 1095 },
    { name: "5Y", value: 1825 },
    { name: "Max", value: "max" },
];

export const chartDetailDurationConstants = [
    [...chartDetailMinutelyDurationConstants],
    [...chartDetailHourlyDurationConstants],
    [...chartDetailDailyDurationConstants],
    [...chartDetailDailyDurationConstants],
];

export const liveMainTreeMapConstants = [
    {
        name: "group",
        data: [
            { label: "Sectors", value: "sectors" },
            { label: "Categories", value: "categories" },
            { label: "Tags", value: "tags" },
            { label: "Algorithm", value: "algorithm" },
            { label: "Ungrouped", value: null },
        ],
    },
    {
        name: "show",
        data: [
            { label: "Market Cap", value: "marketcap" },
            { label: "Market Cap Dominance", value: "marketcapDominance" },
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

// Asset List
export const assetListSparklineGraphOptions = {
    chart: {
        type: "area",
        animations: {
            enabled: false,
        },
        sparkline: {
            enabled: true,
        },
    },
    tooltip: {
        enabled: false,
    },
};

// Asset Detail
export const assetDetailLineGraphOptions = {
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
    title: {
        text: "24H Asset Data"
    },
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

// Chart Main
export const chartMainSparklineGraphOptions = {
    chart: {
        type: "area",
        animations: {
            enabled: false,
        },
        sparkline: {
            enabled: true,
        },
    },
    tooltip: {
        enabled: false,
    },
};

// Chart Detail
export const chartDetailLineGraph = {
    chart: {
        id: "Price",
        group: "ChartDetail",
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
        seriesName: "Price",
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

export const chartDetailBarGraph = {
    chart: {
        id: "Volume",
        group: "ChartDetail",
        toolbar: {
            show: false,
        },
        animations: {
            enabled: false,
        },
    },
    plotOptions: {
        bar: {
            columnWidth: "100%",
        },
    },
    title: {
        text: "Volume",
    },
    dataLabels: {
        enabled: false,
    },
    tooltip: {
        shared: true,
        intersect: false,
        x: {
            formatter: (value) => helpers.formatGraphDateTooltip(value),
        },
        y: {
            formatter: (value, w) => {
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
        seriesName: "Volume",
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
    }
};

// Live Main
export const liveMainTreeMapChartOptions = {
    chart: {
        animations: {
            enabled: false
        },
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
            let value = options.value;
            if (["marketcap", "price", "volume"].indexOf(options.w.globals.initialSeries[options.seriesIndex].data[options.dataPointIndex].data.show) !== -1) {
                value = helpers.currencyFormatter(value, 2, value > 2 ? 2 : 10) || "$0";
            } else {
                value = helpers.percentageFormatter(value, 0, 2) || "0%";
            };
            return [ text, value ];
        },
        offsetY: -4,
    },
    tooltip: {
        y: {
            formatter: (value, options) => {
                if (["marketcap", "price", "volume"].indexOf(options.w.globals.initialSeries[options.seriesIndex].data[options.dataPointIndex].data.show) !== -1) {
                    return helpers.currencyFormatter(value, 2, value > 2 ? 2 : 10) || "$0";
                } else {
                    return helpers.percentageFormatter(value, 0, 2) || "0%";
                };
            },
        },
    },
};

// Live Detail
export const liveDetailCandlestickChartOptions = {
    chart: {
        id: "LiveDetailCandlestick",
        group: "LiveDetail",
        animations: {
            enabled: false,
        },
        toolbar: {
            show: false,
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
                };
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
        axisBorder: {
            show: true,
        },
        labels: {
            formatter: (value) => {
                if (value > 2) {
                    return helpers.currencyFormatter(value, 2, 2);
                };
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
            },
        },
    },
};

export const liveDetailLineChartOptions = {
    chart: {
        id: "LiveDetailLine",
        group: "LiveDetail",
        animations: {
            enabled: false,
        },
        toolbar: {
            show: false,
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
                };
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
        axisBorder: {
            show: true,
        },
        labels: {
            formatter: (value) => {
                if (value > 2) {
                    return helpers.currencyFormatter(value, 2, 2);
                };
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
            },
        },
    },
};

export const liveDetailBarChartOptions = {
    chart: {
        id: "LiveDetailBar",
        group: "LiveDetail",
        toolbar: {
            show: false,
        },
        animations: {
            enabled: false,
        },
    },
    plotOptions: {
        bar: {
            columnWidth: "80%",
        },
    },
    dataLabels: {
        enabled: false,
    },
    tooltip: {
        shared: true,
        intersect: false,
        x: {
            formatter: (value) => helpers.formatGraphDateTooltip(value),
        },
        y: {
            formatter: (value, w) => {
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
    }
};