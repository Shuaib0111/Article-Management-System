import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // Get the token from localStorage
  const auth = JSON.parse(localStorage.getItem("UserData"));

  // Check if the token exists, if yes, allow access to the protected route
  return auth?.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
