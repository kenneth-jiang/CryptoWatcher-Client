import React from 'react';
import Grid from '@material-ui/core/Grid';
import CoinDetailPageChartName from './components/CoinDetailPageChartName';
import CoinDetailPageChartIntervalDurationGroup from './components/CoinDetailPageChartIntervalDurationGroup';
import CoinDetailPageChartBanner from './components/CoinDetailPageChartBanner';
import CoinDetailPageChartChart from './components/CoinDetailPageChartChart';

export default (props) => {
    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={2}>
                    <CoinDetailPageChartName
                        selectedCoin={props.selectedCoin}
                    />
                </Grid>
                <Grid item xs={10}>
                    <CoinDetailPageChartIntervalDurationGroup
                        selectedInterval={props.selectedInterval}
                        selectedDuration={props.selectedDuration}
                        updateSelectedInterval={props.updateSelectedInterval}
                        updateSelectedDuration={props.updateSelectedDuration}
                    />
                </Grid>
            </Grid>
            <br />
            <CoinDetailPageChartBanner
                historicalMarketData={props.viewData}
                startEndTime={{ start: props.viewData.price[0].data[0].x, end: props.viewData.price[0].data[props.viewData.price[0].data.length - 1].x }}
            />
            <br />
            <CoinDetailPageChartChart
                viewData={props.viewData}
            />
        </React.Fragment>
    );
};