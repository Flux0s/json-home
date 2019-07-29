import React, { Component } from "react";
import { Paper, Typography, Container } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import css from "./landing.module.css";

const styles = (theme) => ({
    root: {
        padding: theme.spacing(3, 2)
    }
});

class Landing extends Component {
    render() {
        const MUIstyles = this.props.classes;
        const classes = { ...css, ...MUIstyles };
        console.log(classes);
        return (
            <div className={classes.parent}>
                <div className={classes.background}>
                    <Container>
                        {/* <Paper className={classes.root}> */}
                        <Typography
                            style={{ padding: "75px" }}
                            variant="h2"
                            component="h1"
                        >
                            Open source smart home management
                        </Typography>
                        {/* </Paper> */}
                    </Container>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        className={classes.angle}
                    >
                        <polygon fill="white" points="0,100 100,0 100,100" />
                    </svg>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Landing);
