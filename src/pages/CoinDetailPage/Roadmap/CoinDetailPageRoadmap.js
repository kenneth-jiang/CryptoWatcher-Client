import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Tooltip from '@material-ui/core/Tooltip';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import TabPanel from '@material-ui/core/TabPanel';


export default (props) => {
    const [ selectedTab, setSelectedTab ] = useState(0);
    const [ hoverIndex, setHoverIndex ] = useState(null);

    const HtmlTooltip = withStyles((theme) => ({
        tooltip: {
            backgroundColor: "#F5F5F9",
            color: "black",
            maxWidth: 280,
            fontSize: "15px",
            border: "1px solid #DADDE9",
            padding: "12px",
        },
    }))(Tooltip);

    const tabs = ["Timeline", "Contributors", "Investors"];

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Tabs
                        orientation="vertical"
                        indicatorColor="primary"
                        textColor="primary"
                        value={selectedTab}
                        onChange={(event, newValue) => setSelectedTab(newValue)}
                    >
                        {tabs.map((tab, index) => {
                            return (
                                <Tab key={tab + index} label={tab}>
                                    {/* {tab} */}
                                </Tab>
                            );
                        })}
                    </Tabs>
                </Grid>
                <Grid item xs={10}>
                    {selectedTab === 0
                    && <React.Fragment>
                        <Timeline align="alternate">
                            {props.roadmapData.profile.general.roadmap.map((time, index) => {
                                return (
                                    <HtmlTooltip key={time + index} placement={index % 2 === 0 ? "right-end" : "left-start"} title={time.details} >
                                        <TimelineItem onMouseOver={() => setHoverIndex(index)} onMouseLeave={() => setHoverIndex(null)}>
                                            <TimelineOppositeContent>
                                                <Typography color="textSecondary">{time.date.split("T")[0]}</Typography>
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot color={hoverIndex === index ? "primary" : ""} />
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <Paper elevation={3} style={{ padding: "6px 16px" }}>
                                                    <Typography variant="h6" component="h1">
                                                        {time.title}
                                                    </Typography>
                                                    <Typography>{time.details.length > 120 ? time.details.slice(0, 250) + "..." : time.details}</Typography>
                                                </Paper>
                                            </TimelineContent>
                                        </TimelineItem>
                                    </HtmlTooltip>
                                );
                            })}
                        </Timeline>
                    </React.Fragment>}

                    {selectedTab === 1
                    && <React.Fragment>
                        <strong style={{ fontSize: "larger" }}>{props.roadmapData.profile.contributors.individuals.length > 0 ? "Individuals:" : null}</strong>
                        <Grid container>
                            {props.roadmapData.profile.contributors.individuals.map((individual, index) => {
                                return (
                                    <Grid key={individual + index} item xs={3}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar src={individual.avatar_url} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={individual.first_name + " " + individual.last_name}
                                                secondary={individual.title}
                                            />
                                        </ListItem>
                                    </Grid>
                                );
                            })}
                        </Grid>
                        <br />
                        <strong style={{ fontSize: "larger" }}>{props.roadmapData.profile.contributors.organizations.length > 0 ? "Organizations:" : null}</strong>
                        <Grid container>
                            {props.roadmapData.profile.contributors.organizations.map((organization, index) => {
                                return (
                                    <Grid key={organization + index} item xs={3}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar src={organization.logo} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={organization.name}
                                                secondary={organization.description}
                                            />
                                        </ListItem>
                                    </Grid>
                                )
                            })}
                        </Grid>    
                    </React.Fragment>}

                    {selectedTab === 2
                    && <React.Fragment>
                        <strong style={{ fontSize: "larger" }}>{props.roadmapData.profile.investors.individuals.length > 0 ? "Individuals:" : null}</strong>
                        <Grid container>
                            {props.roadmapData.profile.investors.individuals.map((individual, index) => {
                                return (
                                    <Grid key={individual + key} item xs={3}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar src={individual.avatar_url} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={individual.first_name + " " + individual.last_name}
                                                secondary={individual.title}
                                            />
                                        </ListItem>
                                    </Grid>
                                );
                            })}
                        </Grid> 
                        <br />
                        <strong style={{ fontSize: "larger" }}>{props.roadmapData.profile.investors.organizations.length > 0 ? "Organizations:" : null}</strong>
                        <Grid container>
                            {props.roadmapData.profile.investors.organizations.map((organization, index) => {
                                return (
                                    <Grid key={organization + index} item xs={3}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar src={organization.logo} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={organization.name}
                                                secondary={organization.description}
                                            />
                                        </ListItem>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </React.Fragment>}
                </Grid>
            </Grid>
        </React.Fragment>
    );
};