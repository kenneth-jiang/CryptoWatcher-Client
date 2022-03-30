import { createSlice } from "@reduxjs/toolkit";

export const coinDetailPageSlice = createSlice({
    name: "coinDetailPage",
    initialState: {
        coingeckoAllCoins: null,
        binanceOHLC: null,
        coingeckoOHLC: null,
        coingeckoMetadata: null,
        coingeckoHistoricalData: { minutely: null, hourly: null, daily: null },
        lunarcrushMetadata: null,
        messariMetadata: null,
        selectedCoin: null,
        selectedTab: 0,
        selectedInterval: "daily",
        selectedDuration: { name: "1M", value: 30 },
        viewData: null,
        coinHoldersData: null,
        loading: false,
        error: false,
    },
    reducers: {
        setCoingeckoAllCoins: (state, action) => {
            return { ...state, coingeckoAllCoins: action.payload };
        },
        setBinanceCoinOHLC: (state, action) => {
            let price = [];
            let volume = [];
            let min = parseFloat(action.payload[0][4]);
            action.payload.map((interval) => {
                price.push({ x: new Date(interval[0]).toJSON(), y: interval[4] });
                volume.push({ x: new Date(interval[0]).toJSON(), y: interval[10] });
                if (parseFloat(min) > parseFloat(interval[4])) {
                    min = interval[4];
                };
            });
            let OHLC = {
                min: min,
                series: [
                    { name: "Price", type: "area", data: price },
                    { name: "Volume", type: "bar", data: volume }
                ],
            };
            return { ...state, binanceOHLC: OHLC };
        },
        setCoingeckoOHLC: (state, action) => {
            // return { ...state, coingeckoOHLC: action.payload };
        },
        setCoingeckoCoinMetadata: (state, action) => {
            return { ...state, coingeckoMetadata: action.payload };
        },
        setCoingeckoCoinHistoricalData: (state, action) => {
            let historicalPriceData = [];
            let min = action.payload.prices[0][1];
            action.payload.prices.map((interval) => {
                historicalPriceData.push({ x: interval[0], y: interval[1] });
                if (min > interval[1]) {
                    min = interval[1];
                };
            });
            let historicalMarketCapData = [];
            action.payload.market_caps.map((interval) => {
                historicalMarketCapData.push({ x: interval[0], y: interval[1] });
            });
            let historicalVolumeData = [];
            action.payload.total_volumes.map((interval) => {
                historicalVolumeData.push({ x: interval[0], y: interval[1] });
            });
            return { ...state, coingeckoHistoricalData: {
                ...state.coingeckoHistoricalData, 
                [state.selectedInterval]: {
                    min: min,
                    price: [{ name: "Price", data: historicalPriceData }],
                    marketCap: [{ name: "Market Cap", data: historicalMarketCapData }],
                    volume: [{ name: "Volume", data: historicalVolumeData }],
                },
            }};
        },
        setMessariCoinMetadata: (state, action) => {
            return { ...state, messariMetadata: action.payload };
        },
        setSelectedCoin: (state, action) => {
            let selectedCoin;
            state.coingeckoAllCoins.map((coin) => {
                if (coin.symbol === action.payload) {
                    selectedCoin = coin;
                };
            });
            return { ...state, selectedCoin: selectedCoin };
        },
        setSelectedTab: (state, action) => {
            return { ...state, selectedTab: action.payload };
        },
        updateSelectedInterval: (state, action) => {
            return { ...state, selectedInterval: action.payload };
        },
        updateSelectedDuration: (state, action) => {
            return { ...state, selectedDuration: action.payload };
        },
        updateViewData: (state, action) => {
            if (state.coingeckoHistoricalData[state.selectedInterval]) {
                let priceArray = [ ...state.coingeckoHistoricalData[state.selectedInterval].price[0].data.slice(state.coingeckoHistoricalData[state.selectedInterval].price[0].data.length - 1 - state.selectedDuration.value) ];
                let marketCapArray = [ ...state.coingeckoHistoricalData[state.selectedInterval].marketCap[0].data.slice(state.coingeckoHistoricalData[state.selectedInterval].marketCap[0].data.length - 1 - state.selectedDuration.value) ];
                let volumeArray = [ ...state.coingeckoHistoricalData[state.selectedInterval].volume[0].data.slice(state.coingeckoHistoricalData[state.selectedInterval].volume[0].data.length - 1 - state.selectedDuration.value) ];
                return { 
                    ...state, 
                    viewData: {
                        min: state.coingeckoHistoricalData[state.selectedInterval].min,
                        price: [{ name: "Price", data: priceArray }],
                        marketCap: [{ name: "Market Cap", type: "line", data: marketCapArray }],
                        volume: [{ name: "Volume", data: volumeArray }],
                    },
                    loading: false,
                };
            };
        },
        formatCoinHoldersData: (state, action) => {
            let address = action.payload.on_chain_data;
            let supply = action.payload.supply_distribution;
            let addressUnits = [];
            let addressUSD = [];
            let supplyUnits = [];
            let supplyUSD = [];

            let calculateUnitsOrUSD = (searchObj, searchTerm, array) => {
                let balances = [
                    { label: "10M-100M", value: "r_10m_" },
                    { label: "1M-10M", value: "r_1m_" }, 
                    { label: "100K-1M", value: "r_100k_" }, 
                    { label: "10K-100K", value: "r_10k_" },
                    { label: "1K-10K", value: "r_1k_" },
                    { label: "100-1K", value: "r_100_" },
                    { label: "10-100", value: "r_10_" }, 
                    { label: "1-10", value: "r_1_" },
                    { label: "0.1-1", value: "r_0_1_" }, 
                    { label: "0.01-0.1", value: "r_0_01_" }, 
                    { label: "0.001-0.01", value: "r_0_001_"}
                ];
                let last = 0;
                balances.map((balance, index) => {
                    Object.keys(searchObj).map((key) => {
                        if (key.indexOf(balance.value) !== -1 && key.indexOf(searchTerm) !== -1)  {
                            if (searchTerm.indexOf("usd") !== -1) {
                                array.push({
                                    x: "$" + balance.label.split("-")[0] + "-" + "$" + balance.label.split("-")[1],
                                    y: searchObj[key] - last,
                                });
                            } else {
                                array.push({
                                    x: balance.label + " units",
                                    y: searchObj[key] - last,
                                });
                            };
                            last = searchObj[key];
                        };
                    });
                })
            };
            calculateUnitsOrUSD(address, "native_units_count", addressUnits);
            calculateUnitsOrUSD(address, "usd", addressUSD);
            calculateUnitsOrUSD(supply, "native_units", supplyUnits);
            calculateUnitsOrUSD(supply, "usd", supplyUSD);
            let coinHoldersData = {
                address: {
                    units: [
                        { x: "Count", y: address.addresses_count },
                        { x: "Active", y: address.active_addresses },
                        { x: "At Least 0.001 Units", y: address.addresses_balance_greater_0_001_native_units_count },
                        { x: "At Least 0.01 Units", y: address.addresses_balance_greater_0_01_native_units_count },
                        { x: "At Least 0.1 Units", y: address.addresses_balance_greater_0_1_native_units_count },
                        { x: "At Least 1 Unit", y: address.addresses_balance_greater_1_native_units_count },
                        { x: "At Least 10 Units", y: address.addresses_balance_greater_10_native_units_count },
                        { x: "At Least 100 Units", y: address.addresses_balance_greater_100_native_units_count },
                        { x: "At Least 1K Units", y: address.addresses_balance_greater_1k_native_units_count },
                        { x: "At Least 10K Units", y: address.addresses_balance_greater_10k_native_units_count },
                        { x: "At Least 100K Units", y: address.addresses_balance_greater_100k_native_units_count },
                        { x: "At Least 1M Units", y: address.addresses_balance_greater_1m_native_units_count },
                    ], 
                    price: [
                        { x: "Count", y: address.addresses_count },
                        { x: "Active", y: address.active_addresses },
                        { x: "Balance Greater $1 USD", y: address.addresses_balance_greater_1_usd_count },
                        { x: "Balance Greater $10 USD", y: address.addresses_balance_greater_10_usd_count },
                        { x: "Balance Greater $100 USD", y: address.addresses_balance_greater_100_usd_count },
                        { x: "Balance Greater $1K USD", y: address.addresses_balance_greater_1k_usd_count },
                        { x: "Balance Greater $10K USD", y: address.addresses_balance_greater_10k_usd_count },
                        { x: "Balance Greater $100K USD", y: address.addresses_balance_greater_100k_usd_count },
                        { x: "Balance Greater $1M USD", y: address.addresses_balance_greater_1m_usd_count },
                        { x: "Balance Greater $10M USD", y: address.addresses_balance_greater_10m_usd_count },
                    ],
                }, 
                supply: {
                    units: [
                        { x: "Balance Greater 0.001 Units", y: supply.supply_in_addresses_balance_greater_0_001_native_units },
                        { x: "Balance Greater 0.01 Units", y: supply.supply_in_addresses_balance_greater_0_01_native_units },
                        { x: "Balance Greater 0.1 Units", y: supply.supply_in_addresses_balance_greater_0_1_native_units },
                        { x: "Balance Greater 1 Unit", y: supply.supply_in_addresses_balance_greater_1_native_units },
                        { x: "Balance Greater 10 Units", y: supply.supply_in_addresses_balance_greater_10_native_units },
                        { x: "Balance Greater 100 Units", y: supply.supply_in_addresses_balance_greater_100_native_units },
                        { x: "Balance Greater 1K Units", y: supply.supply_in_addresses_balance_greater_1k_native_units },
                        { x: "Balance Greater 10K Units", y: supply.supply_in_addresses_balance_greater_10k_native_units },
                        { x: "Balance Greater 100K Units", y: supply.supply_in_addresses_balance_greater_100k_native_units },
                        { x: "Balance Greater 1M Units", y: supply.supply_in_addresses_balance_greater_1m_native_units },
                        { x: "Top 100", y: supply.supply_in_top_100_addresses },
                        { x: "Top 10%", y: supply.supply_in_top_10_percent_addresses },
                        { x: "Top 1%", y: supply.supply_in_top_1_percent_addresses },
                    ],
                    price: [
                        { x: "Balance Greater $1 USD", y: supply.supply_in_addresses_balance_greater_1_usd },
                        { x: "Balance Greater $10 USD", y: supply.supply_in_addresses_balance_greater_10_usd },
                        { x: "Balance Greater $100 USD", y: supply.supply_in_addresses_balance_greater_100_usd },
                        { x: "Balance Greater $1K USD", y: supply.supply_in_addresses_balance_greater_1k_usd },
                        { x: "Balance Greater $10K USD", y: supply.supply_in_addresses_balance_greater_10k_usd },
                        { x: "Balance Greater $100K USD", y: supply.supply_in_addresses_balance_greater_100k_usd },
                        { x: "Balance Greater $1M USD", y: supply.supply_in_addresses_balance_greater_1m_usd },
                        { x: "Balance Greater $10M USD", y: supply.supply_in_addresses_balance_greater_10m_usd },
                        { x: "Top 100", y: supply.supply_in_top_100_addresses },
                        { x: "Top 10%", y: supply.supply_in_top_10_percent_addresses },
                        { x: "Top 1%", y: supply.supply_in_top_1_percent_addresses },
                    ],
                }
            };
            let labels = [];
            let data = [];
            coinHoldersData.address.units.map((unit) => {
                labels.push(unit.x);
                data.push(unit.y);
            });
            // return { ...state, coinHoldersData: { labels: labels, data: data } }
            return { ...state, coinHoldersData: { address: { units: addressUnits.reverse(), price: addressUSD.reverse() }, supply: { units: supplyUnits.reverse(), price: supplyUSD.reverse() } } };
        },
        setLoading: (state, action) => {
            return { ...state, loading: true };
        },
        setError: (state, action) => {
            return { ...state, error: action.payload };
        },
    },
});

export const { setCoingeckoAllCoins, setBinanceCoinOHLC, setCoingeckoCoinOHLC, setCoingeckoCoinMetadata, setCoingeckoCoinHistoricalData, setMessariCoinMetadata, setSelectedCoin, setSelectedTab, updateSelectedInterval, updateSelectedDuration, updateViewData, formatCoinHoldersData, setLoading, setError } = coinDetailPageSlice.actions;

export default coinDetailPageSlice.reducer;