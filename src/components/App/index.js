import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import Home from "../Home";

import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

import * as ROUTES from "../../constants/routes";

const theme = createMuiTheme();

const App = () => (
    <Router>
        <ThemeProvider theme={theme}>
            <Navigation />
            <hr />
            <Container component="main" maxWidth="xs">
                <Route exact path={ROUTES.LANDING} component={LandingPage} />
                <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
                <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
                <Route exact path={ROUTES.HOME} component={Home} />
            </Container>
        </ThemeProvider>
    </Router>
);

export default App;
