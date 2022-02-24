import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default (props) => {
    const [ anchorEl, setAnchorEl ] = useState(null);
    const [ anchorEl2, setAnchorEl2 ] = useState(null);
    const [ anchorEl3, setAnchorEl3 ] = useState(null);
    
    const handleClick = (event, index) => {
        if (index === 0) {
            return setAnchorEl(event.currentTarget);
        } else if (index === 1) {
            return setAnchorEl2(event.currentTarget);
        } else if (index === 2) {
            return setAnchorEl3(event.currentTarget);
        };
    };

    const handleClose = () => {
        setAnchorEl(null);
        setAnchorEl2(null);
        setAnchorEl3(null);
    };

    return (
        <Grid container>
            <Grid item xs={3}>
                <Button
                    variant="outlined"
                    color="inherit"
                    size="small"
                    disabled={!props.zoomed}
                    onClick={() => props.setZoomed(false)}
                >
                    Reset Zoom
                </Button>
            </Grid>
            {props.treeMapConstants.map((constant, index) => {
                let currentAnchorEl;
                if (index === 0) {
                    currentAnchorEl = anchorEl;
                } else if (index === 1) {
                    currentAnchorEl = anchorEl2;
                } else if (index === 2) {
                    currentAnchorEl = anchorEl3;
                };
                return (
                    <Grid item xs={3} key={constant + index} style={{ textAlign: "center" }}>
                        <ButtonGroup
                            style={{ width: "100%" }}
                            variant="outlined"
                            color="inherit"
                            size="small"
                            onClick={(event) => handleClick(event, index)}
                        >
                            <Button style={{ width: "100%" }}>
                                {constant.name}: {constant.data.map((ele) => {
                                    if (ele.value === props[constant.name]) {
                                        return ele.label;
                                    }
                                })}
                            </Button>
                            <Button>
                                <ArrowDropDownIcon />
                            </Button>
                        </ButtonGroup>
                        <Menu
                            key={constant + index}
                            // style={{ border: "1px solid" }}
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
                            anchorEl={currentAnchorEl}
                            open={Boolean(currentAnchorEl)}
                            onClose={handleClose}
                        >
                            {constant.data.map((data, index) => {
                                return (
                                    <MenuItem
                                        key={data + index}
                                        style={{ justifyContent: "center" }}
                                        onClick={() => {
                                            props["set"+ constant.name[0].toUpperCase() + constant.name.slice(1)](data.value);
                                            handleClose();
                                        }}
                                        disabled={constant.name === "duration" && ((["marketcap", "marketcapDominance", "price"].indexOf(props.show) !== -1) || (props.show === "volume" && ["1H", "1D"].indexOf(data.value) === -1))}
                                    >
                                        {data.label}
                                    </MenuItem>
                                );
                            })}
                        </Menu>
                    </Grid>
                );
            })}
        </Grid>
    );
};