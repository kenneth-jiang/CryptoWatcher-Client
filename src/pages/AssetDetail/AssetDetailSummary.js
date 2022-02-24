import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export default (props) => {
    return (
        <Paper style={{ border: "1px solid", padding: "16px" }}>
            <Grid item xs={12}>
                <span dangerouslySetInnerHTML={{ __html: props.assetData.description.en }} />
            </Grid>
        </Paper>
    );
};