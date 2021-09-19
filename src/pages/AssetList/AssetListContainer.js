import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import AssetListBanner from './AssetListBanner';
import AssetListDataTable from './AssetListDataTable';
import Loading from '../../components/Loading';
import * as coinGeckoApi from '../../api/coinGeckoApi';
import * as helpers from '../../utils/helpers';

export default () => {
    const [ assetListData, setAssetListData ] = useState(null);
    const [ globalData, setGlobalData ] = useState(null);

    useEffect(() => {
        async function getCoinGeckoAssetListGlobalData() {
            let coinGeckoAssetListResponse = await coinGeckoApi.getCoinGeckoAssetList();
            let assetListDataArray = [];
            coinGeckoAssetListResponse.data.map((asset) => {
                assetListDataArray.push({
                    id: asset.market_cap_rank,
                    name: {
                        name: asset.name,
                        id: asset.id
                    },
                    image: asset.image,
                    symbol: asset.symbol.toUpperCase(),
                    price: helpers.currencyFormatter(asset.current_price, 2, 10),
                    returns24H: asset.price_change_percentage_24h,
                    volume24H: helpers.currencyFormatter(asset.total_volume, 0, 2),
                    marketCap: helpers.currencyFormatter(asset.market_cap, 0, 2),
                    sparkline: asset.sparkline_in_7d.price,
                });
            });
            setAssetListData(assetListDataArray);
            let coinGeckoGlobalData = await coinGeckoApi.getCoinGeckoGlobalData();
            setGlobalData(coinGeckoGlobalData.data.data);
        };
        getCoinGeckoAssetListGlobalData();
    }, []); 
    
    return (
        assetListData && globalData
        ? <Container>
            <AssetListBanner globalData={globalData} />
            <br />
            <AssetListDataTable assetListData={assetListData} />
            </Container>
        : <Loading />
    );
};