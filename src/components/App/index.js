import React from "react";
import { Router, Route, Link } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

import { history } from "../helpers/history";
import { PrivateRoute } from "../helpers/privateRoute";
import { authenticationService } from "../helpers/auth-service";

// import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import Home from "../Home";

import * as ROUTES from "../../constants/routes";

const theme = createMuiTheme();

class App extends React.Component {
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

    logout() {
        authenticationService.logout();
        history.push("/login");
    }

    render() {
        const { currentUser } = this.state;
        return (
            <Router history={history}>
                <ThemeProvider theme={theme}>
                    {/* <Navigation /> */}
                    {currentUser && (
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <div className="navbar-nav">
                                <Link to="/" className="nav-item nav-link">
                                    Home
                                </Link>
                                <a
                                    href="/"
                                    onClick={this.logout}
                                    className="nav-item nav-link"
                                >
                                    Logout
                                </a>
                            </div>
                        </nav>
                    )}
                    <hr />
                    <Container component="main" maxWidth="xs">
                        <Route
                            exact
                            path={ROUTES.LANDING}
                            component={LandingPage}
                        />
                        <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
                        <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
                        <PrivateRoute
                            exact
                            path={ROUTES.HOME}
                            component={Home}
                        />
                    </Container>
                </ThemeProvider>
            </Router>
        );
    }
}

export default App;
