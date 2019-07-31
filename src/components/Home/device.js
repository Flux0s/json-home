import React, { Component } from "react";
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
    gridItem: { margin: theme.spacing(4) }
});

class Device extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid item lg={3} md={4} sm={6} className={classes.gridItem}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h5">{this.props.title}</Typography>
                        <Divider />
                        <Typography variant="body2">
                            {this.props.content}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}

export default withStyles(styles)(Device);
