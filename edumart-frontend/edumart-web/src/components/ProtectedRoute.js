import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
    // We no longer have a token in localStorage, only the userRole.
    // The actual token is in an HttpOnly cookie and managed by the browser.
    const userRole = localStorage.getItem('userRole');

    if (!userRole) {
        // If no role is found, assume not logged in and redirect to login page
        return <Navigate to="/" replace />;
    }

    try {
        // If allowedRoles is provided, check if the current userRole is allowed
        if (allowedRoles && !allowedRoles.includes(userRole)) {
            return <Navigate to="/dashboard" replace />;
        }

        return <Outlet />;
    } catch (error) {
        console.error("Route error:", error);
        localStorage.removeItem('userRole');
        return <Navigate to="/" replace />;
    }
};

export default ProtectedRoute;
