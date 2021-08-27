import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Provider/Authprovider";

function PrivateRoute({ children, ...rest }) {
  const { token, initial } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        token && !initial ? (
          children
        ) : initial ? (
          <p>Loading</p>
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
