import React, { Component } from "react";
import { Typography, Box, Grid, withStyles, Divider } from "@material-ui/core";

import Device from "./device";

const devices = [
    {
        id: 1,
        name: "",
        description: ""
    },
    {
        id: 2,
        name: "",
        description: ""
    },
    {
        id: 3,
        name: "",
        description: ""
    }
];

const styles = (theme) => ({
    root: {},
    divider: {
        margin: theme.spacing(2)
    }
});

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { devices };
    }
    render() {
        const { classes } = this.props;
        return (
            <Box className={classes.root}>
                {/* <Typography variant="h1">Home Page</Typography>
                <Typography variant="h4">
                    This page displays the currently configured list of devices:
                </Typography> 
                <Divider className={classes.divider} /> */}
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <>
                        {devices.map((device) => (
                            <Device
                                key={device.id}
                                title={device.name}
                                content={device.description}
                                icon={device.iconName}
                            />
                        ))}
                    </>
                </Grid>
            </Box>
        );
    }
}

export default withStyles(styles)(Dashboard);
