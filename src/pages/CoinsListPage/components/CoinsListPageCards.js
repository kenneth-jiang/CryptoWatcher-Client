import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import ReactApexChart from "react-apexcharts";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import * as helpers from '../../../utils/helpers';

export default (props) => {
    const observer = useRef();
    
    let history = useHistory();
    
    const lastElement = (node) => {
        const handleObserver = (entries) => {
            if (entries[0].isIntersecting) {
                props.updateCardsPage(props.cardsPage + 1);
            };
        };
        observer.current = new IntersectionObserver(handleObserver);
        if (node) {
            observer.current.observe(node);
        };
    };

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

    const abbreviateLargeNums = (num) => {
        let trillion = { label: "T", value: 1000000000000 };
        let billion = { label: "B", value: 1000000000 };
        let million = { label: "M", value: 1000000 };
        let thousand = { label: "K", value: 1000 };
        for (let ele of [ trillion, billion, million, thousand ]) {
            if (num >= ele.value) {
                return helpers.currencyFormatter(num/ele.value, 2, 2) + ele.label;
            };
        };
    };

    return (
        <Grid container spacing={4}>
            {props.viewData.slice(0, (((props.cardsPage - 1) * props.cardsPerPage) + props.cardsPerPage)).map((coin, index) => {
                return (
                    <React.Fragment key={coin + index}>
                        <Grid item xs={2}>
                            <Card
                                style={{ border: "1px solid" }}
                                onClick={() => history.push("/coins/" + coin.name.toLowerCase())}
                            >
                                <CardActionArea style={{ padding: "16px 16px 0px 16px" }}>
                                    <Grid container>
                                        <Grid item xs={9}>
                                            <strong style={{ fontSize: "larger", whiteSpace: "nowrap" }}>
                                                {coin.name}
                                            </strong>
                                            <br />
                                            {coin.symbol.toUpperCase().slice(0, 8)}
                                        </Grid>
                                        <Grid item xs={3} style={{ textAlign: "right" }}>
                                            <img style={{ height: "35px", width: "35px", marginTop: "auto" }} src={coin.image} />
                                        </Grid>
                                    </Grid>
                                    <br />
                                    <Grid container>
                                        <Grid item xs={6}>
                                            Price:
                                            <br />
                                            Market Cap:
                                            <br />
                                            Volume 24H:
                                        </Grid>
                                        <Grid item xs={6} style={{ textAlign: "right" }}>
                                            <strong>{helpers.currencyFormatter(coin.price, 2, 10)}</strong>
                                            <br />
                                            <strong>{abbreviateLargeNums(coin.marketCap)}</strong>
                                            <br />
                                            <strong>{abbreviateLargeNums(coin.volume1d)}</strong>
                                        </Grid>
                                    </Grid>
                                    <ReactApexChart
                                        options={{...options, colors: [ coin.fillColor ]}}
                                        series={[{ data: coin.sparkline }]}
                                    />
                                </CardActionArea>
                            </Card>
                        </Grid>
                        {props.viewData.slice(0, (((props.cardsPage - 1) * props.cardsPerPage) + props.cardsPerPage)).length === index + 1
                            && <div ref={lastElement} />}
                    </React.Fragment>
                );
            })}
        </Grid>
    );
};