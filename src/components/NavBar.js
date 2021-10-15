import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default (props) => {
    let history = useHistory();

    const navBarData = {
        title: {
            bold: "CRYPTO",
            plain: "WATCHER",
        },
        links: [
            {
                name: "Coins",
                to: "/coins",
                authRequired: false,
            },
            {
                name: "Assets",
                to: "/assets",
                authRequired: false,
            },
            {
                name: "Chart",
                to: "/chart",
                authRequired: false,
            },
            {
                name: "Live",
                to: "/live",
                authRequired: false,
            },
            {
                name: "Order",
                to: "/order",
                authRequired: true,
            }
        ],
    };

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography variant="h6" style={{ cursor: "pointer" }} onClick={() => history.push("/")}>
                    <strong>{navBarData.title.bold}</strong>{navBarData.title.plain}
                </Typography>
                <div style={{"width": "1%"}} />
                {navBarData.links.map((link) => {
                    if (props.loggedIn || !link.authRequired) {
                        return (
                            <Button color="inherit" key={link.name} component={Link} to={link.to}>
                                {link.name}
                            </Button>
                        );
                    };
                })}
                <div style={{ "flexGrow": 1 }} />
                <Button color="inherit" onClick={props.loggedIn ? props.handleLogout : props.handleModalOpen}>
                    {props.loggedIn ? "Logout" : "Login"}
                </Button>
            </Toolbar>
        </AppBar>
    );
};