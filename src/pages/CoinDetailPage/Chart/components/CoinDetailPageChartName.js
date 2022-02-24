import React from 'react';

export default (props) => {
    return (
        <div style={{ display: "flex" }}>
            <div style={{ whiteSpace: "nowrap", display: "block" }}>
                <img style={{ height: "30px", width: "30px" }} src={props.selectedCoin.image} />
                &nbsp;&nbsp;
                <span style={{ fontSize: "30px"}}>
                    <strong>{props.selectedCoin.name}</strong>
                </span>
                &nbsp;&nbsp;
                <span style={{ fontSize: "20px" }}>                
                    ({props.selectedCoin.symbol.toUpperCase()})
                </span>
            </div>
        </div>
    );
};