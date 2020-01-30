import React from "react"
import { Route, Redirect } from "react-router-dom"

import { authenticationService } from "./auth-service"
import { SIGN_IN } from "../../constants/routes"

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const currentUser = authenticationService.currentUserValue
      if (!currentUser) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{
              pathname: SIGN_IN,
              state: { from: props.location }
            }}
          />
        )
      }

      // authorised so return component
      return <Component {...props} />
    }}
  />
)
