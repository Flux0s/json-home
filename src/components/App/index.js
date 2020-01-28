import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";

import { history } from "../helpers/history";
import { PrivateRoute } from "../helpers/privateRoute";
import { authenticationService } from "../helpers/auth-service";
import "./app.css";

import LandingPage from "../Landing";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import Dashboard from "../Dashboard";
import TopAppBar from "../navbar";
import NotFound from "../404";

import * as ROUTES from "../../constants/routes";
import { CssBaseline } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#6C96B8" },
    secondary: { main: "#D6CDA8" }
  }
});

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
    history.push(ROUTES.SIGN_IN);
  }

  render() {
    return (
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider maxSnack={3}>
            <div className='box'>
              <div className='row header'>
                <TopAppBar />
              </div>
              <div className='row content'>
                <Switch>
                  <Route exact path={ROUTES.LANDING} component={LandingPage} />
                  <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
                  <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
                  <PrivateRoute
                    exact
                    path={ROUTES.DASHBOARD}
                    component={Dashboard}
                  />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </div>
          </SnackbarProvider>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
