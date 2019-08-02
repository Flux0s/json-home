import React, { Component } from "react";
import { Typography, Container, Grid, Box } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import css from "./landing.module.css";
import SellingPoint from "./sellingPoint/index";
import sellingPoints from "./sellingPoint/sellingPoints.json";
import { DASHBOARD } from "../../constants/routes";
import { authenticationService } from "../helpers/auth-service";

const styles = (theme) => ({
    headline: {
        [theme.breakpoints.down("xs")]: {
            padding: theme.spacing(6, 4)
        },
        [theme.breakpoints.up("sm")]: {
            padding: theme.spacing(8, 0, 0, 0)
        },
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(10, 2, 0, 0)
        },
        color: "white",
        "font-size": "3em",
        "text-align": "center"
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
                    <Box className="box">
                        <Container className="row header">
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
                            <polygon
                                fill="#eeeeee"
                                points="0,100 100,0 100,100"
                            />
                        </svg>
                        <Grid
                            container
                            // direction="row"
                            justify="space-evenly"
                            alignItems="flex-end"
                            // spacing={4}
                            className="row content"
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
                    </Box>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Landing);
