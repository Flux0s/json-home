import React, { Component } from "react";
import { Card, withStyles, Grid } from "@material-ui/core";
import ContentDevice from "./ContentDevice";
import NewDevice from "./NewDevice";

const styles = (theme) => ({
    card: {
        [theme.breakpoints.up("md")]: {
            height: "330px"
        },
        height: "300px"
    },
    gridItem: {
        margin: theme.spacing(1)
    }
});

class Device extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type
        };
    }
    render() {
        const { classes } = this.props;
        let DeviceDisplay;
        if (this.state.type === "content") {
            DeviceDisplay = <ContentDevice {...this.props.device} />;
        } else if (this.state.type === "new") {
            DeviceDisplay = <NewDevice />;
        }
        return (
            <Grid item lg={3} md={4} sm={4} className={classes.gridItem}>
                <Card className={classes.card}>{DeviceDisplay}</Card>
            </Grid>
        );
    }
}

export default withStyles(styles)(Device);
