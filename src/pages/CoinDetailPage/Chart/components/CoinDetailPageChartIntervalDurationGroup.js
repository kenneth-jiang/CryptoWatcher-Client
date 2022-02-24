import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import * as helpers from '../../../../utils/helpers';

export default (props) => {
    const [ anchorEl, setAnchorEl ] = useState(null);
    const intervals = ["minutely", "hourly", "daily"];

    const durations = {
        minutely: [
            { name: "3H", value: 45 },
            { name: "6H", value: 90 },
            { name: "12H", value: 180 },
            { name: "1D", value: 360 },
        ],
        hourly: [
            { name: "1D", value: 24 },
            { name: "3D", value: 72 },
            { name: "1W", value: 168 },
            { name: "2W", value: 336 },
            { name: "1M", value: 720 },
        ],
        daily: [
            { name: "1M", value: 30 },
            { name: "3M", value: 90 },
            { name: "6M", value: 180 },
            { name: "1Y", value: 365 },
            { name: "3Y", value: 1095 },
            { name: "5Y", value: 1825 },
            { name: "Max", value: "max" },
        ],
    };

    const handleClick = (event) => {
        return setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Grid container>
            <Grid item xs={6}>
                {/* <ButtonGroup color="primary" style={{ padding: "3px", textAlign: "right" }}>
                    {intervals.map((interval, index) => {
                        return (
                            <Button
                                key={interval + index}
                                size="small"
                                variant={interval === props.selectedInterval ? "contained" : ""}
                                onClick={() => {
                                    props.updateSelectedInterval(interval);
                                    props.updateSelectedDuration(durations[interval][0]);
                                }}
                            >
                                {interval}
                            </Button>
                        );
                    })}
                </ButtonGroup> */}
            </Grid>
            <Grid item xs={6} style={{ textAlign: "right" }}>
                <ButtonGroup color="primary" style={{ padding: "3px", textAlign: "right" }}>
                    {durations[props.selectedInterval].map((duration, index) => {
                        return (
                            <Button
                                style={{ width: "100%" }}
                                key={duration + index}
                                size="small"
                                variant={duration.value === props.selectedDuration.value ? "contained" : ""}
                                onClick={() => props.updateSelectedDuration(duration)}
                            >
                                {duration.name}
                            </Button>
                        );
                    })}
                </ButtonGroup>
                <ButtonGroup
                    style={{ width: "100px" }}
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={handleClick}
                >
                    <Button style={{ width: "100%" }}>
                        {props.selectedInterval}
                        {anchorEl ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    </Button>
                </ButtonGroup>
                <Menu
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
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {intervals.map((interval, index) => {
                        return (
                            <MenuItem
                                key={interval + index}
                                style={{ justifyContent: "center" }}
                                onClick={() => {
                                    props.updateSelectedInterval(interval);
                                    props.updateSelectedDuration(durations[interval][0]);
                                    handleClose();
                                }}
                            >
                                {interval}
                            </MenuItem>
                        );
                    })}
                </Menu>
            </Grid>
        </Grid>
    );
};