import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';

export default (props) => {
    return (
        <div style={{ display: "flex" }}>
            <Tabs
                indicatorColor="primary"
                textColor="primary"
                value={props.selectedTab}
                onChange={(event, newValue) => props.setSelectedTab(newValue)}
            >
                <Tab label="Minutely Price" />
                <Tab label="Hourly Price" />
                <Tab label="Daily Price" />
                <Tab label="Market Cap" />
            </Tabs>
            <div style={{ flexGrow: 1 }} />
            <Button
                color={props.multiMode ? "secondary" : "primary"}
                variant="outlined"
                onClick={() => props.setMultiMode(!props.multiMode)}
            >
                {props.multiMode ? "MultiChart Mode" : "Single Chart Mode"}
            </Button>
        </div>
    );
};