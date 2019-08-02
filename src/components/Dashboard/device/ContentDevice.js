import React, { Component } from "react";
import Skeleton from "react-skeleton-loader";
import {
    Typography,
    withStyles,
    CardContent,
    Divider
} from "@material-ui/core";

const styles = (theme) => ({
    divider: {
        margin: theme.spacing(2, 0)
    }
});

class ContentDevice extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { classes } = this.props;
        return (
            <CardContent>
                <Typography variant="h5">
                    {this.props.name || <Skeleton color="#d1d1d1" />}
                </Typography>
                <Divider className={classes.divider} />
                <Typography variant="body2">
                    {this.props.description || (
                        <Skeleton width="100%" color="#d1d1d1" count={3} />
                    )}
                </Typography>
            </CardContent>
        );
    }
}

export default withStyles(styles)(ContentDevice);
