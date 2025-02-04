import React from "react";
import { Navigate } from "react-router";

const isAuthenticated = localStorage.getItem('accessToken');
console.log("isAuthenticated", isAuthenticated);

const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/"></Navigate>
}

export default ProtectedRoute;