import React, { Component } from "react";
import { Typography, Box, Grid, withStyles, Divider } from "@material-ui/core";

import Device from "./device";

const devices = [
    {
        id: 1,
        name: "Default Device",
        description:
            "This is a default device object, if you are seeing this then there was an issue retrieving the list of configured devices from the server."
    }
];

const styles = (theme) => ({
    root: {},
    divider: {
        margin: theme.spacing(2)
    }
});

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { devices };
    }
    render() {
        const { classes } = this.props;
        return (
            <Box className={classes.root}>
                <Typography variant="h1">Home Page</Typography>
                <Typography variant="h4">
                    This page displays the currently configured list of devices:
                </Typography>
                <Divider className={classes.divider} />
                <Grid container spacing={2}>
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

export default withStyles(styles)(Home);
