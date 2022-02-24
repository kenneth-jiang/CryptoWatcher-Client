export const numFormatter = (num, minDec = 0, maxDec = 0) => {
    if (!num) {
        return null;
    }
    let formatter = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: minDec,
        maximumFractionDigits: maxDec,
    });
    return formatter.format(num);
};

export const currencyFormatter = (num, minDec = 2, maxDec = 2) => {
    if (!num) {
        return null;
    }
    let formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: minDec,
        maximumFractionDigits: maxDec,
    });
    return formatter.format(num);
};

export const percentageFormatter = (num, minDec = 2, maxDec = 2) => {
    if (!num) {
        return null;
    }
    let formatter = new Intl.NumberFormat("en-US", {
        style: "percent",
        minimumFractionDigits: minDec,
        maximumFractionDigits: maxDec,
    });
    return formatter.format(num/100);
};

export const greenOrRed = (num) => {
    if (!num) {
        return null;
    }
    return num > 0 ? "#16C784" : "#EA3943";
};

export const getMonthDayYearFromTimeStamp = (date) => {
    if (!date) {
        return "No Data";
    }
    let date1 = date.split("T")[0];
    let date2 = date1.split("-");
    return date2[1] + "/" + date2[2] + "/" + date2[0];
};

export const formatGraphDateTooltip = (value) => {
    let date = new Date(value);
    let hour = date.getHours();
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let timeOfDay = hour >= 12 ? " PM" : " AM";
    hour = hour > 12 ? hour - 12 : hour;
    hour = hour === 0 ? 12 : hour;
    return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + ", " + hour + ":" + minutes + timeOfDay;
};

export const formatGraphDateLabel = (value) => {
    let date = new Date(value);
    let hour = date.getHours();
    let minutes = date.getMinutes();
    if (hour === 0 && minutes === 0) {
        return date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
    }
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let timeOfDay = hour >= 12 ? " PM" : " AM";
    hour = hour > 12 ? hour - 12 : hour;
    hour = hour === 0 ? 12 : hour;
    return hour + ":" + minutes + timeOfDay;
};

export const calculateIntervalDuration = (interval, duration) => {
    let translateTime = {
        m: 1,
        h: 60,
        d: 1440,
        w: 10080,
        M: 43200,
        Y: 525600,
    };
    let calculateTime = (time) => {
        let splitTime = time.slice(0, time.length - 1);
        return parseInt(splitTime) * translateTime[time[time.length - 1]];
    };
    return Math.floor(calculateTime(duration) / calculateTime(interval));
};

export const formatFullDateWithTime = (date) => {
    return new Date(date).toLocaleDateString("en", { weekday: "short", year: "numeric", month: "short", day: "numeric" }) + ", " + new Date(date).toLocaleTimeString("en");
};

export const abbreviateLargeCurrencyNums = (num) => {
    let trillion = { label: "T", value: 1000000000000 };
    let billion = { label: "B", value: 1000000000 };
    let million = { label: "M", value: 1000000 };
    let thousand = { label: "K", value: 1000 };
    for (let ele of [trillion, billion, million, thousand]) {
        if (num >= ele.value) {
            return currencyFormatter(num / ele.value, 2, 2) + ele.label;
        };
    };
};

export const abbreviateLargeNums = (num) => {
    let trillion = { label: "T", value: 1000000000000 };
    let billion = { label: "B", value: 1000000000 };
    let million = { label: "M", value: 1000000 };
    let thousand = { label: "K", value: 1000 };
    for (let ele of [trillion, billion, million, thousand]) {
        if (num >= ele.value) {
            return numFormatter(num / ele.value, 0, 0) + ele.label;
        };
    };
};