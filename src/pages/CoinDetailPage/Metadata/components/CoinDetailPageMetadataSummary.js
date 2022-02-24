import React from 'react';
import Paper from '@material-ui/core/Paper';

export default (props) => {
    return (
        <Paper style={{ border: "1px solid", padding: "16px" }}>
            <span dangerouslySetInnerHTML={{ __html: props.metadata.description.en }} />
        </Paper>
    );
};