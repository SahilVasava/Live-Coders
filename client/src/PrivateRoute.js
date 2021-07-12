import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "./contexts/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, checkToken } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated || checkToken() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
