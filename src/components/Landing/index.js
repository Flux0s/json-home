import React, { Component } from "react";
import { Typography, Container, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import css from "./landing.module.css";
import SellingPoint from "./sellingPoint/index";
import sellingPoints from "./sellingPoint/sellingPoints.json";
import { DASHBOARD } from "../../constants/routes";
import { authenticationService } from "../helpers/auth-service";

const styles = (theme) => ({
    headline: {
        padding: theme.spacing(3, 2),
        color: "white",
        "font-size": "3em"
    },
    cardContainer: {
        margin: theme.spacing(1)
    }
});

class Landing extends Component {
    constructor(props) {
        super(props);
        // redirect to home if already logged in
        if (authenticationService.currentUserValue) {
            this.props.history.push(DASHBOARD);
        }
    }
    render() {
        const MUIstyles = this.props.classes;
        const classes = { ...css, ...MUIstyles };
        console.log(sellingPoints);
        return (
            <div className={classes.parent}>
                <div className={classes.tintedBackground}>
                    <Container>
                        <Typography
                            className={classes.headline}
                            // style={{ padding: "75px" }}
                            variant="h1"
                        >
                            Who needs expensive smart home devices?
                        </Typography>
                    </Container>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        className={classes.angle}
                    >
                        <polygon fill="#eeeeee" points="0,100 100,0 100,100" />
                    </svg>
                    <Grid
                        container
                        // direction="row"
                        justify="space-evenly"
                        alignItems="flex-end"
                        // spacing={4}
                        className={classes.cardContainer}
                    >
                        <>
                            {sellingPoints.map((point) => (
                                <SellingPoint
                                    title={point.title}
                                    content={point.description}
                                    image={point.imagePath}
                                    key={point.title}
                                />
                            ))}
                        </>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Landing);
