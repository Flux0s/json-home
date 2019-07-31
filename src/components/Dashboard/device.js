import React, { Component } from "react";
import Skeleton from "react-skeleton-loader";
import {
    Card,
    Typography,
    withStyles,
    Grid,
    CardContent,
    Divider
} from "@material-ui/core";

const styles = (theme) => ({
    card: {},
    gridItem: {
        margin: theme.spacing(6)
    },
    divider: {
        margin: theme.spacing(2)
    }
});

class Device extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid item lg={3} md={4} sm={4} className={classes.gridItem}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h5">
                            {this.props.title || <Skeleton color="#d1d1d1" />}
                        </Typography>
                        <Divider className={classes.divider} />
                        <Typography variant="body2">
                            {this.props.content || (
                                <Skeleton
                                    width="100%"
                                    color="#d1d1d1"
                                    count={10}
                                />
                            )}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}

export default withStyles(styles)(Device);
