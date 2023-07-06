import React from "react";
import { LoggedInContext } from "../contexts/LoggedInContext.js";
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element }) => {
  const loggedIn = React.useContext(LoggedInContext);
  return loggedIn ? element : <Navigate to="/sign-in" replace />;
};

export default ProtectedRouteElement;
