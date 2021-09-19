import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';

export default () => {
    const [value, setValue] = React.useState(0);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <Tabs
                indicatorColor="primary"
                textColor="primary"
                value={value}
                onChange={handleChange}
            >
                <Tab label="Coinbase" />
                <Tab label="Gemini" />
                <Tab label="Kraken" />
            </Tabs>
            <table style={{ border: "1px solid #ddd", borderCollapse: "collapse", textAlign: "center", width: "95%" }}>
                <tbody>
                    <tr>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Symbol</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Price</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Market Cap</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Volume</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Coinbase</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Gemini</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Kraken</th>
                    </tr>
                    
                        <tr>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                Bitcoin
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                BTC
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                $47,040
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                $900,000,000,000
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                $000,000,000
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                Check
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                Check
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                Check
                            </td>
                        </tr>
                    
                </tbody>
            </table>
        </React.Fragment>
    )
};