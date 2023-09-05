import React from "react"
import {Route, Redirect} from "react-router-dom"
import {isAuthenticated} from "./authapis"

const AdminRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated() ? (
           <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {from: props.location}
              }}
            />
          )
        }
      />
    );
  }

  export default AdminRoute;