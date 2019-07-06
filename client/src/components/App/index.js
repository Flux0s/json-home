import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignIn from "../SignIn";
import Home from "../Home";

import * as ROUTES from "../../constants/routes";
const App = () => (
    <Router>
        <Navigation />
        <hr />
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
        <Route exact path={ROUTES.HOME} component={Home} />
    </Router>
);

export default App;
