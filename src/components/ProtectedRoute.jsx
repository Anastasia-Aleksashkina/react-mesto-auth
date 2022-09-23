import React from "react";
import { Redirect } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  console.log(isLoggedIn);
  return isLoggedIn ? children : <Redirect to="./sign-in" />;
};

export default ProtectedRoute;