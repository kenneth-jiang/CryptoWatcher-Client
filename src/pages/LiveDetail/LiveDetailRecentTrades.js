import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import * as helpers from '../../utils/helpers';

export default (props) => {
    const formatTime = (value) => {
        let date = new Date(value);
        let hour = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let timeOfDay = hour >= 12 ? " PM" : " AM";
        hour = hour > 12 ? hour - 12 : hour;
        hour = hour === 0 ? 12 : hour;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        return hour + ":" + minutes + ":" + seconds + timeOfDay;
    };

    return (
        <Typography variant="caption">
            <Grid container>
                <Grid item xs={12}>
                    <table style={{ border: "1px solid #ddd", borderCollapse: "collapse", textAlign: "center", width: "95%" }}>
                        <thead>
                            <tr>
                                <th colSpan={5} style={{ border: "1px solid #ddd", backgroundColor: "blue", color: "white" }}>
                                    Recent Trades
                                </th>
                            </tr>
                            <tr>
                                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Time</th>
                                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Order Type</th>
                                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Price</th>
                                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Quantity</th>
                                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Order Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.recentTrades.slice(0, 10).map((trade, index) => (
                                <tr key={trade + index}>
                                    <td style={{ border: "1px solid #ddd", padding: "8px", color: trade.isBuyerMaker ? "red" : "green" }}>
                                        {formatTime(new Date(trade.time))}
                                    </td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px", color: trade.isBuyerMaker ? "red" : "green" }}>
                                        {trade.isBuyerMaker ? "Sell" : "Buy"}
                                    </td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px", color: trade.isBuyerMaker ? "red" : "green" }}>
                                        {helpers.currencyFormatter(trade.price, 2, trade.price > 2 ? 2 : 10)}
                                    </td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px", color: trade.isBuyerMaker ? "red" : "green" }}>
                                        {helpers.numFormatter(trade.qty, 0, 8)}
                                    </td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px", color: trade.isBuyerMaker ? "red" : "green" }}>
                                        {helpers.currencyFormatter(trade.quoteQty, 2, trade.price > 2 ? 2 : 10)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Grid>
            </Grid>
        </Typography>
    );
};