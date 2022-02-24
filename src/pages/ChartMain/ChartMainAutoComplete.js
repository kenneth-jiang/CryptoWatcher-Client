import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default (props) => {
    const [ inputValue, setInputValue ] = useState("");

    let history = useHistory();

    return (
        <React.Fragment>
            <br />
            <br />
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
            }}>
                <div style={{ width: "40%" }}>
                    <Typography variant="h3">
                        Let's get started!
                    </Typography>
                    <Typography variant="h5">
                        Select an asset.
                    </Typography>
                </div>
            </div>
            <br />
            <br />
            <div style={{
                display: "flex",
                justifyContent: "center",
            }}>
                <br />
                <br />
                <Autocomplete
                    style={{ width: "40%" }}
                    options={props.assetData}
                    getOptionLabel={(option) => option.name}
                    renderOption={(option) => {
                        return (
                            <React.Fragment>
                                <img src={option.image} style={{ maxWidth: "20px", maxHeight: "20px" }} />
                                &nbsp;&nbsp;
                                {option.name}
                            </React.Fragment>
                        );
                    }}
                    inputValue={inputValue}
                    onInputChange={(event) => setInputValue(event.target.value)}
                    value={undefined}
                    onChange={(event, value) => history.push("/chart/" + value.id.toLowerCase())}
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
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </React.Fragment>
    );
};