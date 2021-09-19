import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import * as helpers from '../../utils/helpers';

export default (props) => {
    return (
        <Typography variant="caption">
            <Grid container>
                <Grid item xs={6}>
                    <table style={{ border: "1px solid #ddd", borderCollapse: "collapse", textAlign: "center", width: "95%" }}>
                        <thead>
                            <tr>
                                <th colSpan={3} style={{ border: "1px solid #ddd", backgroundColor: "green", color: "white" }}>Bids</th>
                            </tr>
                            <tr>
                                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Price</th>
                                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Quantity</th>
                                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Order Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.orderBook.bids.slice(0, 10).map((bid, index) => (
                                <tr key={bid + index}>
                                    <td style={{ border: "1px solid #ddd", padding: "8px", color: "green" }}>
                                        {helpers.currencyFormatter(bid[0], 2, bid[0] > 2 ? 2 : 10)}
                                    </td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px", color: "green" }}>
                                        {bid[1]}
                                    </td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px", color: "green" }}>
                                        {helpers.currencyFormatter(bid[0] * bid[1], 2, bid[0] > 2 ? 2 : 10)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Grid>
                <Grid item xs={6}>
                    <table style={{ border: "1px solid #ddd", borderCollapse: "collapse", textAlign: "center", width: "95%" }}>
                        <thead>
                            <tr>
                                <th colSpan={3} style={{ border: "1px solid #ddd", backgroundColor: "red", color: "white" }}>Asks</th>
                            </tr>
                            <tr>
                                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Price</th>
                                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Quantity</th>
                                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Order Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.orderBook.asks.slice(0, 10).map((ask, index) => (
                                <tr key={ask + index}>
                                    <td style={{ border: "1px solid #ddd", padding: "8px", color: "red" }}>
                                        {helpers.currencyFormatter(ask[0], 2, ask[0] > 2 ? 2 : 10)}
                                    </td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px", color: "red" }}>
                                        {ask[1]}
                                    </td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px", color: "red" }}>
                                        {helpers.currencyFormatter(ask[0] * ask[1], 2, ask[0] > 2 ? 2 : 10)}
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