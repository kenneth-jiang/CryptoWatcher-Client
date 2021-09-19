import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import * as helpers from '../../utils/helpers';

export default (props) => {
    const [ value, setValue ] = useState(props.selectedAsset);

    return (
        <Grid container>
            <Grid item xs={4}>
                <Autocomplete
                    options={props.assetData}
                    getOptionLabel={(option) => option.name}
                    renderOption={(option) => {
                        return (
                            <React.Fragment>
                                <img src={option.image} style={{ maxHeight: "20px", maxWidth: "20px" }} />
                                &nbsp;&nbsp;
                                {option.name}
                            </React.Fragment>
                        );
                    }}
                    value={value}
                    onChange={(event, value) => {
                        if (value) {
                            setValue(value);
                            props.updateSelectedAsset(value);
                        }
                    }}
                    renderInput={(params) => {
                        return (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Search Assets"
                            />
                        );
                    }}
                />
            </Grid>
            <Grid item xs={8} style={{ textAlign: "right" }}>
                <ButtonGroup color="primary" style={{ padding: "3px" }} style={{ textAlign: "right" }}>
                    {props.durations.map((duration, index) => {
                        return (
                            <Button
                                key={duration + index}
                                size="small"
                                variant={duration.value === props.selectedDuration.value ? "contained" : ""}
                                onClick={() => props.setSelectedDuration(duration)}
                            >
                                {duration.name}
                            </Button>
                        )
                    })}
                </ButtonGroup>
                <br />
                <span style={{ fontSize: "smaller" }}>
                    <strong>From: </strong><span style={{ textDecoration: "underline" }}>{helpers.formatFullDateWithTime(props.startEndTime.start)}</span>
                    <br />
                    <strong>To: </strong><span style={{ textDecoration: "underline" }}>{helpers.formatFullDateWithTime(props.startEndTime.end)}</span>
                </span>
            </Grid>
        </Grid>
    );
};