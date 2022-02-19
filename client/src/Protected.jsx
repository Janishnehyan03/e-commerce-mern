import React from "react";
import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserAuthContext } from "./context/UserAuth";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const { authData } = useContext(UserAuthContext);
  const isAuthenticated = authData ? true : false;

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;
