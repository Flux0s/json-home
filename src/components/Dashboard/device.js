import React, { Component } from "react";
import Skeleton from "react-skeleton-loader";
import {
    Card,
    Typography,
    withStyles,
    Grid,
    CardContent,
    Divider,
    Button
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const styles = (theme) => ({
    card: {
        height: "250px"
    },
    gridItem: {
        margin: theme.spacing(4)
    },
    divider: {
        margin: theme.spacing(2)
    },
    addDeviceCard: {
        height: "100%",
        "text-align": "center",
        display: "flex",
        "background-color": theme.palette.grey[200]
    },
    addIconButton: {
        margin: "auto",
        width: "100%",
        height: "100%"
    },
    addIcon: {
        width: "30%",
        height: "30%"
    }
});

function DeviceDisplay(props) {
    if (props.type === "content") {
        return (
            <CardContent>
                <Typography variant="h5">
                    {props.title || <Skeleton color="#d1d1d1" />}
                </Typography>
                <Divider className={props.classes.divider} />
                <Typography variant="body2">
                    {props.content || (
                        <Skeleton width="100%" color="#d1d1d1" count={3} />
                    )}
                </Typography>
            </CardContent>
        );
    } else if (props.type === "new")
        return (
            <CardContent>
                <Typography variant="h5">
                    {props.title || <Skeleton color="#d1d1d1" />}
                </Typography>
                <Divider className={props.classes.divider} />
                <Typography variant="body2">
                    {props.content || (
                        <Skeleton width="100%" color="#d1d1d1" count={3} />
                    )}
                </Typography>
            </CardContent>
        );
    else
        return (
            <CardContent
                className={props.classes.addDeviceCard}
                style={{ padding: "0px" }}
            >
                <Button
                    aria-label="add"
                    size="large"
                    className={props.classes.addIconButton}
                    onClick={props.handleAddClick}
                >
                    <AddIcon className={props.classes.addIcon} />
                </Button>
            </CardContent>
        );
}

class Device extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type
        };
    }

    createDeviceForm = () => {
        console.log("Click!");
        this.setState({ type: "new" });
    };

    render() {
        const { classes } = this.props;

        return (
            <Grid item lg={3} md={4} sm={4} className={classes.gridItem}>
                <Card className={classes.card}>
                    <DeviceDisplay
                        type={this.state.type}
                        {...this.props}
                        handleAddClick={this.createDeviceForm}
                    />
                </Card>
            </Grid>
        );
    }
}

export default withStyles(styles)(Device);
