import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';

export default (props) => {
    const unixTimestampToTimeAgo = (time) => {
        let currentTime = Date.parse(new Date())/1000;
        let differenceInTime = Math.floor((currentTime - time)/60);
        if (differenceInTime > 1440) {
            let days = Math.floor(differenceInTime/1440);
            if (days === 1) {
                return days + " day ago";
            };
            return days + " days ago";
        } else if (differenceInTime > 60) {
            let hours = Math.floor(differenceInTime/60);
            if (hours === 1) {
                return hours + " hour ago";
            };
            return hours + " hours ago";
        } else if (differenceInTime < 60) {
            if (differenceInTime === 1) {
                return differenceInTime + " minute ago";
            };
            return differenceInTime + " minutes ago"
        } else if (differenceInTime < 1) {
            return "Less than 1 minute ago";
        };
    };

    return (
        <Paper elevation={4} style={{ padding: "30px 20px 30px 20px", overflow: "auto", height: "850px", border: "1px solid #D8D8D8", backgroundColor: "#FBFBFB" }}>
            {props.newsArticles.map((newsArticle, index) => {
                return (
                    <React.Fragment key={newsArticle + index}>
                        <Card elevation={2} style={{ width: "400px" }}>
                            <CardContent style={{ overflow: "hidden", height: "100px" }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={9}>
                                        <strong style={{ cursor: "pointer" }} onClick={() => window.open(newsArticle.url)}>
                                            {newsArticle.title}
                                        </strong>
                                        <br />
                                        <span style={{ fontSize: "smaller" }} dangerouslySetInnerHTML={{ __html: newsArticle.body }} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <img src={newsArticle.imageurl} style={{ height: "100px", width: "100px" }} />
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <img src={newsArticle.source_info.img} style={{ height: "20px", width: "20px" }} />
                                <span style={{ cursor: "pointer" }} onClick={() => window.open(newsArticle.url.split(".com")[0] + ".com")}>
                                    {newsArticle.source_info.name}
                                </span>
                                <div style={{ flexGrow: 1}} />
                                <span style={{ fontStyle: "italic", fontSize: "smaller" }}>
                                    {unixTimestampToTimeAgo(newsArticle.published_on)}
                                </span>
                            </CardActions>
                        </Card>
                        <br />
                    </React.Fragment>
                );
            })}
        </Paper>
    );
};