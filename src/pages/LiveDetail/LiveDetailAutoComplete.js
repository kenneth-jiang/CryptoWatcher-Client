import React, { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default (props) => {
    const [ value, setValue ] = useState(props.selectedAsset);

    return (
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
    );
};