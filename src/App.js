import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'; 
// import crypto from 'crypto';
import Typography from '@material-ui/core/Typography';
import NavBar from './components/NavBar';
import Modal from './components/Modal';
import NotFound from './components/NotFound';
import AssetListContainer from './pages/AssetList/AssetListContainer';
import AssetDetailContainer from './pages/AssetDetail/AssetDetailContainer';
import ChartMainContainer from './pages/ChartMain/ChartMainContainer';
import ChartDetailContainer from './pages/ChartDetail/ChartDetailContainer';
import LiveMainContainer from './pages/LiveMain/LiveMainContainer';
import LiveDetailContainer from './pages/LiveDetail/LiveDetailContainer';
import OrderMainContainer from './pages/OrderMain/OrderMainContainer';
import * as constants from './utils/constants';

export default () => {
    const [ loggedIn, setLoggedIn ] = useState(true);
    const [ loginError, setLoginError ] = useState(false);
    const [ modalOpen, setModalOpen ] = useState(false);

    useEffect(() => {
        // let encryptedPassword = crypto.createHmac("sha256", process.env.PASSWORD).digest("hex");
        // if (window.sessionStorage.getItem("key") === encryptedPassword) {
        //     return setLoggedIn(true);
        // }
        return setLoggedIn(false);
    }, []);

    const handleLogin = (event, inputValue) => {
        event.preventDefault();
        // if (inputValue === process.env.PASSWORD) {
        //     window.sessionStorage.setItem("key", crypto.createHmac("sha256", inputValue).digest("hex"));
        //     setLoggedIn(true);
        //     setLoginError(false);
        //     return setModalOpen(false);
        // }
        return setLoginError(true);
    };

    const handleLogout = () => {
        window.sessionStorage.removeItem("key");
        return setLoggedIn(false);
    };

    const handleModalOpen = () => {
        return setModalOpen(true);
    };

    const handleModalClose = () => {
        return setModalOpen(false);
    };
    
    return (
        <BrowserRouter>
            <Typography variant="subtitle2">
                <NavBar 
                    navBarData={constants.navBarConstants}
                    loggedIn={loggedIn}
                    handleLogout={handleLogout}
                    handleModalOpen={handleModalOpen}
                />
                {modalOpen &&
                    <Modal
                        loginError={loginError}
                        modalOpen={modalOpen}
                        handleLogin={handleLogin}
                        handleModalClose={handleModalClose}
                    />
                }
                <br />
                <br />
                <Switch>
                    <Route exact path="/" component={() => <div>Welcome to the homepage!</div>} />
                    <Route exact path="/assets" component={AssetListContainer} />
                    <Route exact path="/assets/:name" component={AssetDetailContainer} />
                    <Route exact path="/chart" component={ChartMainContainer} />
                    <Route exact path="/chart/:name" component={ChartDetailContainer} />
                    <Route exact path="/live" component={LiveMainContainer} />
                    <Route exact path="/live/:name" component={LiveDetailContainer} />
                    <Route path="/order" component={loggedIn ? OrderMainContainer : () => <Redirect to="/" />} />
                    <Route exact path="/404" component={NotFound} />
                    <Redirect to="/404" />
                </Switch>
            </Typography>
        </BrowserRouter>
    );
};