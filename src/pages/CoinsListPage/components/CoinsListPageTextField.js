import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

export default (props) => {
    const [ inputValue, setInputValue ] = useState("");

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (inputValue !== "") {
                props.updateViewData(inputValue);
            } else if (inputValue === "") {
                props.updateViewData();
            };
        }, 500);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [ inputValue ]);

    const handleInputChange = (event) => {
        return setInputValue(event.target.value);
    };

    return (
        <Paper style={{ display: "flex" }}>
            <IconButton disabled>
                <SearchIcon />
            </IconButton>
            <InputBase
                style={{ width: "350px" }}
                placeholder="Search Name or Symbol"
                autoFocus={true}
                value={inputValue}
                onChange={handleInputChange}
            />
        </Paper>
    );
};