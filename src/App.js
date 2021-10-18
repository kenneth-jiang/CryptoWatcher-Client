import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import NavBar from './components/NavBar';
import Modal from './components/Modal';
import NotFound from './components/NotFound';
import LandingPageContainer from './pages/LandingPage/LandingPageContainer';
import CoinsListPageContainer from './pages/CoinsListPage/CoinsListPageContainer';
import AssetListContainer from './pages/AssetList/AssetListContainer';
import AssetDetailContainer from './pages/AssetDetail/AssetDetailContainer';
import ChartMainContainer from './pages/ChartMain/ChartMainContainer';
import ChartDetailContainer from './pages/ChartDetail/ChartDetailContainer';
import LiveMainContainer from './pages/LiveMain/LiveMainContainer';
import LiveDetailContainer from './pages/LiveDetail/LiveDetailContainer';
import OrderMainContainer from './pages/OrderMain/OrderMainContainer';
import { getCoingeckoGlobalData, getCoingeckoTrendingCoins, getAllCoingeckoCoins } from './redux/apiSlices/coingeckoSlice';
import { getCryptocompareNewsArticles } from './redux/apiSlices/cryptocompareSlice';
import { getLunarcrushGlobalData } from './redux/apiSlices/lunarcrushSlice';
import { getAllMessariCoins } from './redux/apiSlices/messariSlice';
import { authenticate, login, logout, openModal, closeModal } from './redux/pageSlices/authenticationSlice';

export default () => {
    const dispatch = useDispatch();
    const authentication = useSelector((state) => state.authentication);

    useEffect(() => {
        dispatch(getCoingeckoGlobalData());
        dispatch(getCoingeckoTrendingCoins());
        dispatch(getAllCoingeckoCoins());
        dispatch(getCryptocompareNewsArticles());
        dispatch(getLunarcrushGlobalData());
        dispatch(getAllMessariCoins());
        // dispatch(authenticate());
    }, []);
    
    return (
        <BrowserRouter>
            <Typography variant="subtitle2">
                <NavBar 
                    loggedIn={authentication.loggedIn}
                    handleLogout={() => dispatch(logout())}
                    handleModalOpen={() => dispatch(openModal())}
                />
                {authentication.displayModal &&
                    <Modal
                        loginError={authentication.loginError}
                        modalOpen={authentication.displayModal}
                        handleLogin={(inputValue) => dispatch(login(inputValue))}
                        handleModalClose={() => dispatch(closeModal())}
                    />
                }
                <br />
                <br />
                <Switch>
                    <Route exact path="/" component={LandingPageContainer} />
                    <Route exact path="/coins" component={CoinsListPageContainer} />
                    {/* <Route exact path="/assets" component={AssetListContainer} /> */}
                    <Route exact path="/coins/:name" component={AssetDetailContainer} />
                    <Route exact path="/chart" component={ChartMainContainer} />
                    <Route exact path="/chart/:name" component={ChartDetailContainer} />
                    {/* <Route exact path="/live" component={LiveMainContainer} /> */}
                    <Route exact path="/live" component={() => <Redirect to="/live/bitcoin" />} />
                    <Route exact path="/live/:name" component={LiveDetailContainer} />
                    <Route path="/order" component={authentication.loggedIn ? OrderMainContainer : () => <Redirect to="/" />} />
                    <Route exact path="/404" component={NotFound} />
                    <Redirect to="/404" />
                </Switch>
            </Typography>
        </BrowserRouter>
    );
};