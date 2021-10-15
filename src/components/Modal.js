import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default (props) => {
    const [ inputValue, setInputValue ] = useState("");

    const handleSubmit = (event, inputValue) => {
        event.preventDefault();
        return props.handleLogin(inputValue);
    };

    return (
        <Modal
            open={props.modalOpen}
            onClose={props.handleModalClose}
        >
            <Card style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                position: "absolute",
                width: 400,
                border: "1px solid",
                boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
                padding: "16px 32px, 24px",
            }}>
                <CardContent>
                    <h2>Enter Password</h2>
                    <form onSubmit={(event) => handleSubmit(event, inputValue)}>
                        <TextField 
                            variant="outlined"
                            type="password"
                            label={props.loginError ? "The password did not match." : "Enter Password"}
                            error={props.loginError ? true : false}
                            style={{ width: "100%" }}
                            value={inputValue}
                            onChange={(event) => setInputValue(event.target.value)}
                        />
                        <br />
                        <br />
                        <div style={{ "textAlign": "right" }}>
                            <Button variant="contained" color="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Modal>
    );
};