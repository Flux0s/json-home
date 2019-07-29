import React from "react";
import "./landing.css";
import { Paper, Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3, 2)
    }
}));

function Landing() {
    const classes = useStyles();
    return (
        <div classname="landing">
            <Container>
                <Paper className={classes.root}>
                    <Typography variant="h5" component="h3">
                        This is a sheet of paper.
                    </Typography>
                </Paper>
            </Container>
        </div>
    );
}

export default Landing;
