import React from 'react';
import Grid from '@material-ui/core/Grid';
import CoinDetailPageMetadataBanner from './components/CoinDetailPageMetadataBanner';
import CoinDetailPageMetadataChart from './components/CoinDetailPageMetadataChart';
import CoinDetailPageMetadataReturns from './components/CoinDetailPageMetadataReturns';
import CoinDetailPageMetadataKeyMetrics from './components/CoinDetailPageMetadataKeyMetrics';
import CoinDetailPageMetadataSummary from './components/CoinDetailPageMetadataSummary';

export default (props) => {
    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <CoinDetailPageMetadataBanner
                        assetData={props.metadata}
                    />
                    <CoinDetailPageMetadataChart
                        OHLC={props.OHLC}
                    />
                    <br />
                    <CoinDetailPageMetadataReturns
                        assetData={props.metadata}
                        messariMetadata={props.messariMetadata}
                    />
                </Grid>
                <Grid item xs={4}>
                    <CoinDetailPageMetadataKeyMetrics assetData={props.metadata} />
                </Grid>
            </Grid>
            <br />
            <CoinDetailPageMetadataSummary metadata={props.metadata} />
        </React.Fragment>      
    );
};