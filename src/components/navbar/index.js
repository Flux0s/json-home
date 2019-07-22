import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { SIGN_IN } from "../../constants/routes";
import { withStyles } from "@material-ui/styles";
import { authenticationService } from "../helpers/auth-service";

const styles = (theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
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

    TopLeftButton = (props) => {
        const isLoggedIn = props.currentUser != null;
        if (isLoggedIn) {
            return (
                <Button color="inherit" onClick={this.redirectSignIn}>
                    Sign-In
                </Button>
            );
        } else {
            return (
                <Button color="inherit" onClick={this.logout}>
                    Sign-Out
                </Button>
            );
        }
    };

    redirectSignIn = () => {
        this.props.history.push(SIGN_IN);
    };
    logout() {
        authenticationService.logout();
        this.props.history.push(SIGN_IN);
    }
    render() {
        const { classes } = this.props;
        const { currentUser } = this.state;

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
                        <this.TopLeftButton />
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(TopAppBar));
