import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReactApexChart from "react-apexcharts";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import * as helpers from '../../../utils/helpers';

export default (props) => {
    const [ hoverIndex, onHoverIndex ] = useState(null);

    let history = useHistory();

    const coinTableHeaders = [
        { name: "#", value: "rank", position: "right", width: "35px" },
        { name: "Name", value: "name", position: "left", width: "250px" }, 
        { name: "Price", value: "price", position: "right", width: "100px" },
        { name: "1H %", value: "return1h", position: "right", width: "80px" },
        { name: "24H %", value: "return1d", position: "right", width: "80px" },
        { name: "7D %", value: "return1w", position: "right", width: "80px" },
        { name: "Market Cap", value: "marketCap", position: "right", width: "150px" },
        { name: "Volume (24H)", value: "volume1d", position: "right", width: "150px" },
        { name: "Circulating Supply", value: "percentageCirculatingToMaxSupply", position: "right", width: "200px" },
        { name: "Last 7 Days", value: "sparkline", position: "center", width: "250px" }
    ];

    const StyledTooltip = withStyles((theme) => ({
        tooltip: {
            border: "1px solid black",
            padding: "16px",
            backgroundColor: "#FDFDFD",
            color: "black",
            height: 100,
            width: 300,
        },
    }))(Tooltip);

    const options = {
        chart: {
            animations: {
                enabled: false,
            },
            sparkline: {
                enabled: true,
            },
        },
        stroke: {
            curve: "straight",
            width: 2,
        },
        tooltip: {
            enabled: false,
        },
    };

    return (
        <Paper>
            <TableContainer>
                <Table size="small" stickyHeader style={{ tableLayout: "fixed", height: "995px" }}>
                    <TableHead>
                        <TableRow style={{ height: "60px" }}>
                            {coinTableHeaders.map((header, index) => {
                                return (
                                    <TableCell key={header + index} style={{ textAlign: header.position, width: header.width, cursor: "pointer", border: "1px solid #ddd" }}>
                                        <span style={{ float: "left" }}>
                                            {props.sortDirection === "descending"
                                            ? <ArrowDownwardIcon
                                                // disabled={props.sortValue === header.value}
                                                fontSize="small"
                                                color="primary"
                                                style={{ verticalAlign: "sub", display: (props.sortValue === header.value ? "inline" : "none") }}
                                                onClick={() => props.updateSortValueAndDirection(header.value)}
                                            />
                                            : <ArrowUpwardIcon
                                                // disabled={props.sortValue === header.value}
                                                fontSize="small"
                                                color="primary"
                                                style={{ verticalAlign: "sub", display: (props.sortValue === header.value ? "inline" : "none") }}
                                                onClick={() => props.updateSortValueAndDirection(header.value)}
                                            />
                                            }
                                        </span>
                                        &nbsp;
                                        <strong style={{ cursor: "pointer" }} onClick={() => props.updateSortValueAndDirection(header.value)}>
                                            {header.name}
                                        </strong>
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.viewData.slice((props.tablePage - 1) * props.rowsPerPage, (props.tablePage - 1) * props.rowsPerPage + props.rowsPerPage).map((coinRowData, index) => {
                            return (
                                <TableRow
                                    key={coinRowData + index}
                                    style={{ backgroundColor: (hoverIndex === index ? "#FDFBF6" : index % 2 !== 0 ? "#FAFBFC" : "white"), whiteSpace: "nowrap" }}
                                    onMouseEnter={() => onHoverIndex(index)}
                                    onMouseLeave={() => onHoverIndex(null)}
                                >
                                    <TableCell style={{ textAlign: "right", width: "60px", whiteSpace: "nowrap", border: "1px solid #ddd" }}>
                                        {coinRowData.rank}
                                    </TableCell>
                                    <TableCell style={{ textAlign: "left", width: "275px", whiteSpace: "nowrap", border: "1px solid #ddd" }}>
                                        <Grid container>
                                            <Grid item xs={3}>
                                               <img style={{ height: "40px", width: "40px" }} src={coinRowData.image} />
                                            </Grid>
                                            <Grid item xs={9}>
                                                <span style={{ cursor: "pointer" }} onClick={() => history.push("/coins/" + coinRowData.symbol.toLowerCase())}>
                                                    <strong style={{ fontSize: "larger", whiteSpace: "nowrap" }}>
                                                        {coinRowData.name}
                                                    </strong>
                                                    <br />
                                                    {coinRowData.symbol}
                                                </span>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell style={{ textAlign: "right", fontSize: "larger", width: "170px", whiteSpace: "nowrap", border: "1px solid #ddd" }}>
                                        <StyledTooltip
                                            placement="right-start"
                                            title={
                                                <React.Fragment>
                                                    <Typography variant="body2" color="inherit">
                                                        <Grid container>
                                                            <Grid item xs={3} style={{ verticalAlign: "middle" }}>
                                                                <span style={{ textDecoration: "underline" }}>
                                                                    24H Low
                                                                </span>
                                                                <br />
                                                                <strong>
                                                                    {coinRowData.low1d.slice(0, 9)}
                                                                </strong>
                                                            </Grid>
                                                            <Grid item xs={6} style={{ verticalAlign: "middle", alignItems: "center" }}>
                                                                    <ArrowDownwardIcon style={{ height: "15px", width: "15px", transform: "translate(" + ((coinRowData.percentageCurrentToLowHigh1d * 10) - 50).toString() + "%)"}} />
                                                                <br />
                                                                <LinearProgress
                                                                    variant="determinate"
                                                                    style={{ color: "black" }}
                                                                    value={coinRowData.percentageCurrentToLowHigh1d}
                                                                />                                               
                                                            </Grid>
                                                            <Grid item xs={3} style={{ verticalAlign: "middle", textAlign: "right" }}>
                                                                <span style={{ float: "right" }}>
                                                                        <span style={{ textDecoration: "underline" }}>
                                                                            24H High
                                                                        </span>
                                                                    <br />
                                                                    <strong>
                                                                        {coinRowData.high1d.slice(0, 9)}
                                                                    </strong>
                                                                </span>
                                                            </Grid>
                                                        </Grid>
                                                        <br />
                                                        <div>
                                                            <span>Percentage From Low</span>
                                                            <span style={{ float: "right", color: (coinRowData.percentageCurrentToLow1d !== "0.00%" ? "green" : "black") }}>
                                                                {coinRowData.percentageCurrentToLow1d}
                                                            </span>
                                                            <br />
                                                            <span>Percentage From High</span>
                                                            <span style={{ float: "right", color: (coinRowData.percentageCurrentToHigh1d !== "0.00%" ? "red" : "black") }}>
                                                                {coinRowData.percentageCurrentToHigh1d}
                                                            </span>
                                                        </div>                                       
                                                    </Typography>
                                                </React.Fragment>
                                            }>
                                            <span style={{ cursor: "pointer", whitespace: "nowrap" }}>
                                                {helpers.currencyFormatter(coinRowData.price, 2, 10)}
                                            </span>
                                        </StyledTooltip>
                                    </TableCell>
                                    <TableCell style={{ textAlign: "right", color: helpers.greenOrRed(coinRowData.return1h), border: "1px solid #ddd" }}>
                                        {helpers.percentageFormatter(coinRowData.return1h, 2, 2)}
                                    </TableCell>
                                    <TableCell style={{ textAlign: "right", color: helpers.greenOrRed(coinRowData.return1d), border: "1px solid #ddd" }}>
                                        {helpers.percentageFormatter(coinRowData.return1d, 2, 2)}
                                    </TableCell>
                                    <TableCell style={{ textAlign: "right", color: helpers.greenOrRed(coinRowData.return1w), border: "1px solid #ddd" }}>
                                        {helpers.percentageFormatter(coinRowData.return1w, 2, 2)}
                                    </TableCell>
                                    <TableCell style={{ textAlign: "right", border: "1px solid #ddd" }}>
                                        {helpers.currencyFormatter(coinRowData.marketCap, 0, 2)}
                                    </TableCell>
                                    <TableCell style={{ textAlign: "right", border: "1px solid #ddd" }}>
                                        {helpers.currencyFormatter(coinRowData.volume1d, 0 ,2)}
                                    </TableCell>
                                    <TableCell style={{ textAlign: "right", border: "1px solid #ddd" }}>
                                        {coinRowData.percentageCirculatingToMaxSupply
                                        ? <StyledTooltip
                                            placement="right-start"
                                            title={
                                                <React.Fragment>
                                                    <Typography variant="body2" color="inherit">
                                                        <div>
                                                            <span>Percentage Mined</span>
                                                            <span style={{ float: "right" }}>{helpers.percentageFormatter(coinRowData.percentageCirculatingToMaxSupply, 2, 2)}</span>
                                                        </div>
                                                        <br />
                                                        <LinearProgress
                                                            variant="determinate"
                                                            style={{ color: "black" }}
                                                            value={coinRowData.percentageCirculatingToMaxSupply}
                                                        />
                                                        <br />
                                                        <div>
                                                            <span>Circulating Supply</span>
                                                            <span style={{ float: "right" }}>
                                                                {helpers.numFormatter(coinRowData.circulatingSupply, 0, 0)}
                                                            </span>
                                                            <br />
                                                            <span>Max Supply</span>
                                                            <span style={{ float: "right" }}>
                                                                {helpers.numFormatter(coinRowData.maxSupply, 0, 0)}
                                                            </span>
                                                        </div>
                                                    </Typography>
                                                </React.Fragment>
                                            }>
                                            <span style={{ cursor: "pointer", whitespace: "nowrap" }}>                                            
                                                {helpers.numFormatter(coinRowData.circulatingSupply, 0, 0) + " " + coinRowData.symbol.toUpperCase()}
                                                {<LinearProgress variant="determinate" style={{ width: "75%", float: "right" }} value={coinRowData.percentageCirculatingToMaxSupply} />}
                                            </span>
                                        </StyledTooltip>
                                        : helpers.numFormatter(coinRowData.circulatingSupply, 0, 0) + " " + coinRowData.symbol.toUpperCase()
                                        }
                                    </TableCell>
                                    <TableCell style={{ width: "200px", border: "1px solid #ddd" }}>
                                        <ReactApexChart
                                            options={{ ...options, colors: [() => (coinRowData.return1w > 0 ? "#16C784" : "#EA3943") ] }}
                                            series={[{ data: coinRowData.sparkline }]}
                                            height="80"
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ display: "flex", padding: "16px" }}>
                <div style={{ width: "33%" }}/>
                <div style={{ width: "34%", alignSelf: "center", textAlign: "center" }}>
                    Showing {((props.tablePage - 1) * props.rowsPerPage) + 1}-{props.viewData.length < (props.tablePage) * props.rowsPerPage ? props.viewData.length : (props.tablePage) * props.rowsPerPage} of {props.viewData.length} coins
                </div>
                <div style={{ width: "33%", textAlign: "right" }}>
                    <ButtonGroup color="primary">
                        <Button
                            disabled={props.tablePage === 1 ? true : false}
                            onClick={() => props.updateTablePage(1)}
                        >
                            <FirstPageIcon                                
                                style={{ verticalAlign: "middle" }}
                                onClick={() => props.updateTablePage(1)}
                            />
                        </Button>
                        <Button
                            disabled={props.tablePage === 1 ? true : false}
                            onClick={() => props.updateTablePage(props.tablePage - 1)}
                        >
                            <ChevronLeftIcon style={{ verticalAlign: "middle" }} />
                        </Button>
                        {[props.tablePage - 2, props.tablePage - 1, props.tablePage, props.tablePage + 1, props.tablePage + 2].map((pageEle, index) => {
                            if (pageEle > 0 && pageEle < Math.ceil(props.viewData.length / props.rowsPerPage) + 1) {
                                return (
                                    <Button
                                        key={pageEle + index}
                                        variant={props.tablePage === pageEle ? "contained" : "outlined"}
                                        onClick={() => props.updateTablePage(pageEle)}
                                    >
                                        {pageEle}
                                    </Button>
                                );
                            }
                        })}
                        <Button
                            disabled={props.tablePage === Math.ceil(props.viewData.length / props.rowsPerPage) ? true : false}
                            onClick={() => props.updateTablePage(props.tablePage + 1)}
                        >
                            <ChevronRightIcon style={{ verticalAlign: "middle" }} />
                        </Button>
                        <Button
                            disabled={props.tablePage === Math.ceil(props.viewData.length / props.rowsPerPage) ? true : false}
                            onClick={() => props.updateTablePage(Math.ceil(props.viewData.length / props.rowsPerPage))}
                        >
                            <LastPageIcon style={{ verticalAlign: "middle" }} />
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        </Paper>
    );
};