import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

export default () => {
    return (
        <React.Fragment>
            {/* <LinearProgress /> */}
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                minHeight: "80vh"
            }}>
                <CircularProgress size={80} />
            </div>
        </React.Fragment>
    );
};