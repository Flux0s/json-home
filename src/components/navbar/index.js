import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { SIGN_IN } from "../../constants/routes";
import { withStyles } from "@material-ui/styles";
import { authenticationService } from "../helpers/auth-service";

const styles = (theme) => ({
    root: {
        flexGrow: 1
    },
    title: {
        flexGrow: 1
    },
    button: {
        margin: theme.spacing(10)
    }
});

class TopAppBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        };
    }
    componentDidMount() {
        authenticationService.currentUser.subscribe((x) =>
            this.setState({ currentUser: x })
        );
    }
    AuthChangeButton = () => {
        console.log(window.location.pathname);
        if (window.location.pathname === SIGN_IN) return null;
        const isLoggedIn = this.state.currentUser != null;
        if (isLoggedIn) {
            return (
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={this.logout}
                >
                    Sign-Out
                </Button>
            );
        } else {
            return (
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={this.redirectSignIn}
                >
                    Sign-In
                </Button>
            );
        }
    };
    redirectSignIn = () => {
        this.props.history.push(SIGN_IN);
    };
    logout = () => {
        authenticationService.logout();
        this.props.history.push(SIGN_IN);
    };
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        {/* <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="Menu"
                    >
                        <MenuIcon />
                    </IconButton> */}
                        <Typography variant="h6" className={classes.title}>
                            Json Home
                        </Typography>

                        <this.AuthChangeButton className={classes.button} />
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(TopAppBar));
