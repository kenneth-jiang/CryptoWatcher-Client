import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ListIcon from '@material-ui/icons/List';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

export default (props) => {
    return (
        <ButtonGroup
            style={{ marginLeft: "auto", marginTop: "auto" }}
            color="primary"
        >
            <Button
                variant={props.view === "table" ? "contained" : "outlined"}
                onClick={() => props.updateView("table")}
            >
                <ListIcon />
            </Button>
            <Button
                variant={props.view === "cards" ? "contained" : "outlined"}
                onClick={() => props.updateView("cards")}
            >
                <ViewModuleIcon />
            </Button>
        </ButtonGroup>
    );
};