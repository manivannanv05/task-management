import React from "react";
import { Navigate } from "react-router";
import { UserRoles } from "./UserRoleContext";

const isAuthenticated = localStorage.getItem('accessToken');

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { role } = UserRoles();
    console.log("role",role )
    if (isAuthenticated && (allowedRoles.includes(role))) {
        return children;
    } else if (isAuthenticated && (!allowedRoles.includes(role))) {
        return <Navigate to="/noaccess"></Navigate>;
    } else {
        return <Navigate to="/"></Navigate>;
    }

}

export default ProtectedRoute;