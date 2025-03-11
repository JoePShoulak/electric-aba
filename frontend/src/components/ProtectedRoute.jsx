import React from "react";
import { Route, Navigate } from "react-router-dom";

// ProtectedRoute to handle redirection based on user login status
const ProtectedRoute = ({ element: Element, currentUser, ...rest }) => {
  return (
    <Route
      {...rest}
      element={currentUser ? Element : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
