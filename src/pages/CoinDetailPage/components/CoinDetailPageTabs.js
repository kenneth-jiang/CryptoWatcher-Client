import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default (props) => {
    let tabs = [
        "Overview",
        "Chart",
        // "Roadmap",
        // "Holders",
    ];

    return (
        <Tabs
            indicatorColor="primary"
            textColor="primary"
            value={props.selectedTab}
            onChange={(event, newValue) => props.setSelectedTab(newValue)}
        >
            {tabs.map((tab, index) => {
                return (
                    <Tab key={tab + index} label={tab} />
                );
            })}
        </Tabs>
    );
};