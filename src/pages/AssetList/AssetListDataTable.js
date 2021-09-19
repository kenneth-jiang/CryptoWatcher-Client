import React from 'react';
import { useHistory } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import Paper from '@material-ui/core/Paper';
import { DataGrid } from '@material-ui/data-grid';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import * as constants from '../../utils/constants';
import * as helpers from '../../utils/helpers';

export default (props) => {
    const assetListHeaders = [
        {
            field: "id",
            headerName: "#",
            width: 85,
        },
        {
            field: "image",
            headerName: "",
            width: 50,
            sortable: false,
            renderCell: (params) => {
                return (
                    <img style={{ maxHeight: "auto", maxWidth: "100%" }} src={params.value} />
                );
            },
        },
        {
            field: "name",
            headerName: "Name",
            width: 150,
            renderCell: (params) => {
                return (
                    <div style={{ "cursor": "pointer" }}>
                        <strong>{params.value.name}</strong>
                    </div>
                );
            },
        },
        {
            field: "symbol",
            headerName: "Symbol",
            width: 140,
        },
        {
            field: "price",
            headerName: "Price",
            width: 160,
        },
        {
            field: "returns24H",
            headerName: "Returns 24H",
            width: 160,
            renderCell: (params) => {
                return (
                    <div style={{ color: helpers.greenOrRed(params.value) }}>
                        {params.value > 0
                            ? <ArrowDropUpIcon style={{ verticalAlign: "middle" }} />
                            : <ArrowDropDownIcon style={{ verticalAlign: "middle" }} />
                        }
                        {helpers.percentageFormatter(params.value)}
                    </div>
                );
            },
        },
        {
            field: "volume24H",
            headerName: "Volume 24H",
            width: 160,
        },
        {
            field: "marketCap",
            headerName: "Market Cap",
            width: 160,
        },
        {
            field: "sparkline",
            headerName: "Last 7 Days",
            width: 160,
            sortable: false,
            renderCell: (params) => {
                return (
                    <ReactApexChart
                        options={constants.assetListSparklineGraphOptions}
                        series={[{ data: params.value }]}
                    />
                );
            },
        },
    ];

    let history = useHistory();

    return (
        <Paper style={{ border: "1px solid" }}>
            <DataGrid
                columns={assetListHeaders}
                rows={props.assetListData}
                autoHeight={true}
                rowHeight={87}
                autoPageSize={true}
                pageSize={10}
                disableSelectionOnClick={true}
                onCellClick={(params) => {
                    if (params.field === "name") {
                        return history.push("/assets/" + params.value.id.toLowerCase());
                    };
                }}
            />
        </Paper>
    );
};