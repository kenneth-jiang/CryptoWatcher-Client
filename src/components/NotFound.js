import React from 'react';
import { Link } from 'react-router-dom';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Button from '@material-ui/core/Button';

export default () => {
    return (
        <React.Fragment>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <SentimentVeryDissatisfiedIcon style={{ fontSize: "300px", color: "red" }}/>
            </div>
            <br/>
            <div style={{ textAlign: "center", fontSize: "170px" }}>
                404
            </div>
            <div style={{ textAlign: "center", fontSize: "40px", color: "grey" }}>
                Oops! The page you were looking for was not found.
                <br />
                <br />
                <Button component={Link} to="/" variant="outlined">
                    Back to Home
                </Button>
            </div>
        </React.Fragment>
    );
};