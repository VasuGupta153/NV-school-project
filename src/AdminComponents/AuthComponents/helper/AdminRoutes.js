import React from "react"
import {Route, Navigate} from "react-router-dom"
import {isAuthenticated} from "./authapis"

const AdminRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated() ? (
           <Component {...props} />
          ) : (
            <Navigate
              to={{
                pathname: "/login",
                state: {from: props.location}
              }}
              replace
            />
          )
        }
      />
    );
  }

  export default AdminRoute;