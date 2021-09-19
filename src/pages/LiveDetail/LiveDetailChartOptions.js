import React from 'react';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import * as helpers from '../../utils/helpers';

export default (props) => {
    const intervals = ["1m", "3m", "5m", "15m", "30m", "1h", "2h", "4h", "6h", "8h", "12h", "1d", "3d", "1w", "1M"];
    const [ chartTypeAnchorEl, setChartTypeAnchorEl ] = React.useState(null);

    const handleClick = (event) => {
        return setChartTypeAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        return setChartTypeAnchorEl(null);
    };

    const selectChartType = (type) => {
        props.setChartType(type);
        return setChartTypeAnchorEl(null);
    };

    return (
        <Grid container>
            <Grid item xs={2}>
                <span style={{ textAlign: "center" }}>
                    <div>
                        {props.assetLiveData.asset.name} ({props.assetLiveData.asset.symbol.toUpperCase()})
                    </div>
                    <div style={{ color: props.assetLiveData.color, textAlign: "center", fontSize: "25px" }}>
                        <strong>{helpers.currencyFormatter(props.assetLiveData.price, 2, props.assetLiveData.price > 2 ? 2 : 8)}</strong>
                    </div>
                </span>
            </Grid>
            <Grid item xs={2} style={{ textAlign: "right" }}>
                <Button
                    style={{ backgroundColor: "#1976d2", color: "white" }}
                    variant="contained"
                    onClick={handleClick}
                >
                    Chart Type:
                    <br />
                    {props.chartType[0].toUpperCase() + props.chartType.slice(1)}
                </Button>
                <Menu
                    PaperProps={{
                        style: {
                            border: "1px solid",
                        }
                    }}
                    elevation={0}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    anchorEl={chartTypeAnchorEl}
                    keepMounted
                    open={Boolean(chartTypeAnchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem dense={true} onClick={() => selectChartType("candlestick")}>
                        Candlestick
                    </MenuItem>
                    <MenuItem dense={true} onClick={() => selectChartType("area")}>
                        Area
                    </MenuItem>
                    <MenuItem dense={true} onClick={() => selectChartType("line")}>
                        Line
                    </MenuItem>
                </Menu>
            </Grid>
            <Grid item xs={8} style={{ textAlign: "right" }}>
                {/* <ButtonGroup size="small">
                    {intervals.map((interval, index) => {
                        return (
                            <Button key={interval + index}>
                                {interval}
                            </Button>
                        );
                    })}
                </ButtonGroup>
                <br /> */}
                <span style={{ fontSize: "smaller" }}>
                    From: &nbsp;
                    <span style={{ textDecoration: "underline" }}>
                        {props.assetLiveData.start}
                    </span>
                    <br />
                    To: &nbsp;
                    <span style={{ textDecoration: "underline" }}>
                        {props.assetLiveData.end}
                    </span>
                </span>
            </Grid>
        </Grid>
    );
};