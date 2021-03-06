import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import ChartMainAutoComplete from './ChartMainAutoComplete';
import ChartMainCardGroup from './ChartMainCardGroup';
import Loading from '../../components/Loading';
import * as coingeckoApi from '../../api/coingeckoApi';

export default () => {
    const [ assetData, setAssetData ] = useState(null);

    useEffect(() => {
        async function getCoinGeckoAssetList() {
            let coinGeckoAssetListResponse = await coingeckoApi.getCoingeckoAssetList();
            setAssetData(coinGeckoAssetListResponse.data);
        };
        getCoinGeckoAssetList();
    }, []);

    return (assetData
        ? <Container>
            <ChartMainAutoComplete assetData={assetData} />
            <ChartMainCardGroup assetData={assetData} />
        </Container>
        : <Loading />
    );
};