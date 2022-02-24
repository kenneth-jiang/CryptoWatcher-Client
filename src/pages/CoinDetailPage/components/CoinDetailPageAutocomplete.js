import React, { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/TextField';

export default (props) => {
    const [ value, setValue ] = useState(props.selectedAsset);

    return (
        <Autocomplete
            style={{ width: "350px" }}
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
                    props.setSelectedCoin(value);
                };
            }}
            renderInput={(params) => {
                return (
                    <InputBase
                        {...params}
                        variant="outlined"
                        label="Select a Coin"
                    />
                );
            }}
        />
    );
};