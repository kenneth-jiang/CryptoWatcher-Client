import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import Loading from '../../components/Loading'; 
import CoinsListPageTextField from './components/CoinsListPageTextField'; 
import CoinsListPageViewOptions from './components/CoinsListPageViewOptions'; 
import CoinsListPageTable from './components/CoinsListPageTable'; 
import CoinsListPageCards from './components/CoinsListPageCards';
import { formatAllCoinsData, updateView, updateViewData, updateSortValueAndDirection, updateTablePage, updateCardsPage } from '../../redux/pageSlices/coinsListPageSlice';
import * as constants from '../../utils/constants';

export default () => {
    const dispatch = useDispatch();
    const coingecko = useSelector((state) => state.coingecko);
    const coinsListPage = useSelector((state) => state.coinsListPage);
    
    useEffect(() => {
        if (coingecko.allCoins) {
            let updatedCoinList = coingecko.allCoins.filter(coin => constants.binanceCoins.includes(coin.symbol.toUpperCase()));
            dispatch(formatAllCoinsData(updatedCoinList));
            // dispatch(formatAllCoinsData(coingecko.allCoins));
            dispatch(updateViewData());
        };
    }, [ coingecko ]);

    return (
        coinsListPage.viewData
        ? <Container maxWidth="xl">
            <div style={{ display: "flex" }}>
                <CoinsListPageTextField
                    updateViewData={(value) => dispatch(updateViewData(value))}
                />
                <CoinsListPageViewOptions
                    view={coinsListPage.view}
                    updateView={(value) => dispatch(updateView(value))}
                />
            </div>
            <br />
            {coinsListPage.view === "table"
            && <CoinsListPageTable
                viewData={coinsListPage.viewData}
                sortValue={coinsListPage.sortValue}
                sortDirection={coinsListPage.sortDirection}
                updateSortValueAndDirection={(value) => {
                    dispatch(updateSortValueAndDirection(value));
                    dispatch(updateViewData());
                }}
                tablePage={coinsListPage.tablePage}
                rowsPerPage={coinsListPage.rowsPerPage}
                updateTablePage={(value) => dispatch(updateTablePage(value))}
            />}
            {coinsListPage.view === "cards"
            && <CoinsListPageCards
                viewData={coinsListPage.viewData}
                sortValue={coinsListPage.sortValue}
                sortDirection={coinsListPage.sortDirection}
                updateSortValueAndDirection={(value) => {
                    dispatch(updateSortValueAndDirection(value));
                    dispatch(updateViewData());
                }}
                cardsPage={coinsListPage.cardsPage}
                cardsPerPage={coinsListPage.cardsPerPage}
                updateCardsPage={(value) => dispatch(updateCardsPage(value))}
            />}
        </Container>
        : <Loading />
    );
};