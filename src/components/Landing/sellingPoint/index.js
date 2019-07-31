import {
    withStyles,
    Card,
    Typography,
    Grid,
    CardContent
    // CardMedia
} from "@material-ui/core";
import React, { Component } from "react";

const styles = (theme) => ({
    gridItem: {
        zIndex: 1
    },
    card: {
        // padding: theme.spacing(1),
        // height: 150,
        [theme.breakpoints.down("sm")]: {
            margin: theme.spacing(3, 3)
        },
        [theme.breakpoints.up("md")]: {
            margin: theme.spacing(2, 4)
        },
        [theme.breakpoints.up("lg")]: {
            margin: theme.spacing(2, 10)
        }
    },
    media: {
        // height: 90
    }
});

class SellingPoint extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Grid item xs className={classes.gridItem}>
                <Card className={classes.card}>
                    {/* <CardMedia
                            className={classes.media}
                            image={this.props.imagePath}
                        /> */}
                    <CardContent>
                        <Typography gutterBottom variant="h5">
                            {this.props.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            {this.props.content}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}

export default withStyles(styles)(SellingPoint);
