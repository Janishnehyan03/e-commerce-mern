import React from "react";
import { useContext } from "react";
import { Route } from "react-router-dom";
import { UserAuthContext } from "../../context/UserAuth";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const { authData } = useContext(UserAuthContext);
  const isAdmin = authData && authData.isAdmin ? true : false;

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAdmin ? (
          <Component {...props} />
        ) : (
          <>
            <div className="container py-16">
              <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
                <h2 className="text-2xl text-red-500 font-medium mb-1">
                  You are not authorized to access this page
                </h2>
                <p className="text-gray-600 mb-6 text-sm">
                  Please login as admin to access this page
                </p>
              </div>
            </div>
          </>
        )
      }
    />
  );
}

export default ProtectedRoute;
