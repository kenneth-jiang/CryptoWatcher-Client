import * as helpers from './helpers';

export const binanceCoins = [
    "BTC",
    "ETH",
    "XRP",
    "BCH",
    "LTC",
    "USDT",
    "BTC",
    "ETH",
    "XRP",
    "BCH",
    "LTC",
    "BNB",
    "BNB",
    "ETH",
    "XRP",
    "BNB",
    "LTC",
    "BCH",
    "ADA",
    "BAT",
    "ETC",
    "XLM",
    "ZRX",
    "ADA",
    "BAT",
    "ETC",
    "XLM",
    "ZRX",
    "LINK",
    "RVN",
    "DASH",
    "ZEC",
    "ALGO",
    "IOTA",
    "BUSD",
    "BTC",
    "DOGE",
    "WAVES",
    "ATOM",
    "ATOM",
    "NEO",
    "NEO",
    "VET",
    "QTUM",
    "QTUM",
    "NANO",
    "ICX",
    "ENJ",
    "ONT",
    "ONT",
    "ZIL",
    "ZIL",
    "VET",
    "BNB",
    "XRP",
    "ETH",
    "ALGO",
    "XTZ",
    "XTZ",
    "HBAR",
    "HBAR",
    "OMG",
    "OMG",
    "MATIC",
    "MATIC",
    "XTZ",
    "ADA",
    "REP",
    "REP",
    "EOS",
    "EOS",
    "DOGE",
    "KNC",
    "KNC",
    "VTHO",
    "VTHO",
    "USDC",
    "COMP",
    "COMP",
    "MANA",
    "HNT",
    "HNT",
    "MKR",
    "MKR",
    "DAI",
    "ONE",
    "ONE",
    "BAND",
    "BAND",
    "STORJ",
    "STORJ",
    "BUSD",
    "UNI",
    "UNI",
    "SOL",
    "SOL",
    "LINK",
    "VET",
    "UNI",
    "EGLD",
    "EGLD",
    "PAXG",
    "PAXG",
    "OXT",
    "OXT",
    "ZEN",
    "ZEN",
    "BTC",
    "ONE",
    "FIL",
    "FIL",
    "AAVE",
    "AAVE",
    "GRT",
    "GRT",
    "SUSHI",
    "ANKR",
    "AMP",
    "SHIB",
    "SHIB",
    "CRV",
    "CRV",
    "AXS",
    "AXS",
    "SOL",
    "AVAX",
    "AVAX",
    "CTSI",
    "CTSI",
    "DOT",
    "DOT",
    "YFI",
    "YFI",
    "1INCH",
    "1INCH",
    "FTM",
    "FTM",
    "USDC",
    "ETH",
    "USDC",
    "MATIC",
    "MANA",
    "MANA",
    "ALGO",
    "ADA",
    "SOL",
    "LINK",
    "EOS",
    "ZEC",
    "ENJ",
    "NEAR",
    "NEAR",
    "NEAR",
    "OMG",
    "SUSHI",
    "LRC",
    "LRC",
    "LRC",
    "KSHIB",
    "LPT",
    "LPT",
    "LPT",
    "POLY",
    "POLY",
    "POLY",
    "POLY",
    "MATIC",
    "DOT",
    "NMR",
    "NMR",
    "SLP",
    "SLP",
    "ANT",
    "ANT",
    "XNO",
    "CHZ",
    "CHZ",
    "OGN",
    "OGN",
    "GALA",
    "GALA",
    "TLM",
    "TLM",
    "SNX",
    "SNX",
    "AUDIO",
    "AUDIO",
    "ENS",
    "MANA",
    "ATOM",
    "AVAX",
    "WBTC",
    "REQ",
    "REQ",
    "APE",
    "APE",
    "FLUX",
    "FLUX"
];

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
        name: "limit",
        data: [
            { label: "Top 100 Coins", value: 100 },
            { label: "Top 200 Coins", value: 200 },
            { label: "Top 300 Coins", value: 300 },
            { label: "Top 400 Coins", value: 400 },
            { label: "Top 500 Coins", value: 500 },
        ],
    },
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
    plotOptions: {
        treemap: {
            enableShades: false
        }
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