import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';
import ForumIcon from '@material-ui/icons/Forum';
import GitHubIcon from '@material-ui/icons/GitHub';
import RedditIcon from '@material-ui/icons/Reddit';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

export default (props) => {
    const [ socialAnchorEle, setSocialAnchorEle ] = useState(null);
    const [ blockchainAnchorEle, setBlockchainAnchorEle ] = useState(null);
    const [ marketsAnchorEle, setMarketsAnchorEle ] = useState(null);

    const handleClick = (event, type) => {
        if (type === "social") {
            return setSocialAnchorEle(event.currentTarget);
        } else if (type === "blockchain") {
            return setBlockchainAnchorEle(event.currentTarget);
        } else if (type === "markets") {
            return setMarketsAnchorEle(event.currentTarget);
        };
    };

    const handleClose = () => {
        setSocialAnchorEle(null);
        setBlockchainAnchorEle(null);
        setMarketsAnchorEle(null);
    };

    const linksChips = [
        {
            name: "Homepage",
            icon: <HomeIcon />,
            onClick: () => window.open(props.assetData.links.homepage[0]),
        },
        {
            name: "Social",
            deleteIcon: <ExpandMoreIcon />,
            onDelete: (event) => handleClick(event, "social"),
            onClick: (event) => handleClick(event, "social"),
        },
        {
            name: "Markets",
            deleteIcon: <ExpandMoreIcon />,
            onDelete: (event) => handleClick(event, "markets"),
            onClick: (event) => handleClick(event, "markets"),
        },
        {
            name: "Blockchain",
            deleteIcon: <ExpandMoreIcon />,
            onDelete: (event) => handleClick(event, "blockchain"),
            onClick: (event) => handleClick(event, "blockchain"),
        },
    ];

    const socialMenuItems = [
        {
            name: "Forum",
            icon: <ForumIcon fontSize="small" />,
            link: props.assetData.links.official_forum_url[0],
        },
        {
            name: "Github",
            icon: <GitHubIcon fontSize="small" />,
            link: props.assetData.links.repos_url.github[0],
        },
        {
            name: "Reddit",
            icon: <RedditIcon fontSize="small" />,
            link: props.assetData.links.subreddit_url,
        },
        {
            name: "Facebook",
            icon: <FacebookIcon fontSize="small" />,
            link: "https://www.facebook.com/" + props.assetData.links.facebook_username,
        },
        {
            name: "Twitter",
            icon: <TwitterIcon fontSize="small" />,
            link: "https://twitter.com/" + props.assetData.links.twitter_screen_name,
        },
    ];

    const linksMenus = [
        {
            anchor: socialAnchorEle,
            children: socialMenuItems.map((item, index) => {
                if (item.link) {
                    return (
                        <MenuItem key={item + index} dense={true} onClick={() => window.open(item.link)}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            {item.name}
                        </MenuItem>
                    );
                };
            }),
        },
        {
            anchor: marketsAnchorEle,
            children: props.assetData.tickers.map((ticker, index) => {
                if (ticker.target === "USD") {
                    return (
                        <MenuItem key={ticker + index} dense={true} onClick={() => window.open(ticker.trade_url)}>
                            {ticker.market.name}
                        </MenuItem>
                    );
                };
            }),
        },
        {
            anchor: blockchainAnchorEle,
            children: props.assetData.links.blockchain_site.map((site, index) => {
                if (site) {
                    return (
                        <MenuItem key={site + index} dense={true} onClick={() => window.open(site)}>
                            {site}
                        </MenuItem>
                    );
                };
            }),
        },
    ];

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12}>
                    <img src={props.assetData.image.small} />
                    &nbsp;&nbsp;
                    <span style={{ fontSize: "50px" }}>
                        <strong>{props.assetData.name}</strong>
                    </span>
                    &nbsp;&nbsp;
                    <span style={{ fontSize: "30px" }}>
                        ({props.assetData.symbol.toUpperCase()})
                    </span>
                </Grid>
            </Grid>
            <Grid container>
                <div style={{ flexGrow: 1 }} />
                {linksChips.map((chip, index) => {
                    return (
                        <Chip
                            key={chip + index}
                            style={{ margin: "3px" }}
                            variant="outlined"
                            label={chip.name}
                            icon={chip.icon || null}
                            deleteIcon={chip.deleteIcon || null}
                            onDelete={chip.onDelete || null}
                            onClick={chip.onClick}
                        />
                    );
                })}
                {linksMenus.map((menu, index) => {
                    return (
                        <Menu
                            key={menu + index}
                            PaperProps={{
                                style: {
                                    border: "1px solid",
                                }
                            }}
                            elevation={0}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "center",
                            }}
                            keepMounted
                            getContentAnchorEl={null}
                            anchorEl={menu.anchor}
                            open={Boolean(menu.anchor)}
                            onClose={handleClose}
                        >
                            {menu.children}
                        </Menu>
                    );
                })}
            </Grid>
        </React.Fragment>
    );
};