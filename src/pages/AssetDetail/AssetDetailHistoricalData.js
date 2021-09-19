import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import * as helpers from '../../utils/helpers';

export default (props) => {
    const [ page, setPage ] = useState(0);
    const [ rowsPerPage, setRowsPerPage ] = useState(15);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <React.Fragment>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ textAlign: "center" }}>
                                <strong>Date</strong>
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                                <strong>Price</strong>
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                                <strong>Volume</strong>
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                                <strong>Market Cap</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.historicalData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((interval) => {
                            return (
                                <TableRow hover>
                                    <TableCell style={{ textAlign: "center" }}>
                                        {new Date(interval.date).toLocaleString("default", { month: "long" }) + " " + new Date(interval.date).getDate() + ", " + new Date(interval.date).getFullYear()}
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        {interval.price > 2 ? helpers.currencyFormatter(interval.price, 2, 2) : helpers.currencyFormatter(interval.price, 2, 10)}
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        {interval.volume > 2 ? helpers.currencyFormatter(interval.volume, 2, 2) : helpers.currencyFormatter(interval.volume, 2, 10)}
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        {interval.market_cap > 2 ? helpers.currencyFormatter(interval.market_cap, 2, 2) : helpers.currencyFormatter(interval.market_cap, 2, 10)}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={props.historicalData.length}
                page={page}
                onChangePage={handleChangePage}
                rowsPerPageOptions={[10, 25, 100]}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </React.Fragment>
    )
};