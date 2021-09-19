import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import * as constants from '../../utils/constants';
import * as helpers from '../../utils/helpers';

export default (props) => {
    const [ cardData, setCardData ] = useState([[], [], []]);
    const [ currentTab, setCurrentTab ] = useState(0);

    useEffect(() => {
        const compare = (a, b) => {
            if (a.price_change_percentage_7d_in_currency > b.price_change_percentage_7d_in_currency) {
                return -1;
            }
            if (a.price_change_percentage_7d_in_currency < b.price_change_percentage_7d_in_currency) {
                return 1;
            }
            return 0;
        };
        let sortedArray = [...props.assetData].sort(compare).slice(0, 8);
        let reversedArray = [...props.assetData].sort(compare).reverse().slice(0, 8);
        let randomArray = [];
        for (let i = 0; i < 8; i++) {
            randomArray.push(props.assetData[Math.floor(Math.random() * 250)]);
        };
        setCardData([props.assetData.slice(0, 8), sortedArray, reversedArray, randomArray])
    }, []);

    const randomizeCardData = () => {
        let randomArray = [];
        for (let i = 0; i < 8; i++) {
            randomArray.push(props.assetData[Math.floor(Math.random() * 250)]);
        };
        return setCardData([[...cardData[0]], [...cardData[1]], [...cardData[2]], randomArray])
    };

    let history = useHistory();
    
    return (
        <React.Fragment>
            <Tabs
                indicatorColor="primary"
                value={currentTab}
                onChange={(event, newValue) => setCurrentTab(newValue)}
                >
                <Tab label="Top Assets" />
                <Tab label="To the Moon!" />
                <Tab label="Worst Performers" />
                <Tab label="Randomize" onClick={randomizeCardData} />
            </Tabs>
            <br />
            <Grid container spacing={2}>
                {cardData[currentTab].map((asset, index) => {
                    return (
                        <Grid key={asset + index} item xs={3}>
                            <Card
                                style={{ border: "1px solid" }}
                                onClick={() => history.push("/chart/" + asset.id.toLowerCase())}
                            >
                                <CardActionArea>
                                    <CardContent>
                                        <Typography variant="h6">
                                            <strong>
                                                {asset.name.slice(0, 12)} ({asset.symbol.toUpperCase().slice(0, 8)})
                                            </strong>
                                            <span style={{ display: "inline-block", float: "right" }}>
                                                #{asset.market_cap_rank}
                                            </span>
                                        </Typography>
                                        <Typography variant="button">
                                            {helpers.currencyFormatter(asset.current_price, 2, 10)}
                                            <span style={{ color: helpers.greenOrRed(asset.price_change_percentage_7d_in_currency) }}>
                                                {asset.price_change_percentage_7d_in_currency > 0
                                                    ? <ArrowDropUpIcon style={{ verticalAlign: "middle" }} />
                                                    : <ArrowDropDownIcon style={{ verticalAlign: "middle" }} />
                                                }
                                                {helpers.percentageFormatter(asset.price_change_percentage_7d_in_currency, 2, 2)}
                                            </span>
                                        </Typography>
                                    </CardContent>
                                    <CardMedia>
                                        <ReactApexChart
                                            options={constants.chartMainSparklineGraphOptions}
                                            series={[{ data: asset.sparkline_in_7d.price }]}
                                        />
                                    </CardMedia>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    );
                })}
                <Grid container>
                    <div style={{ flexGrow: 1 }} />
                    <Tab style={{ fontWeight: "bold", textDecoration: "underline" }} disabled label="7D ASSET DATA" />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};