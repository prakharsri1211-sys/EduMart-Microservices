import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        // If not logged in, redirect to login page
        return <Navigate to="/" replace />;
    }

    try {
        const decoded = jwtDecode(token);
        const userRole = decoded.role || decoded.authorities; // Adjust based on exact JWT structure

        // Note: For now, if allowedRoles isn't provided, just require a valid token
        if (allowedRoles && !allowedRoles.includes(userRole)) {
            // Alternatively, redirect to an unauthorized page or dashboard
            return <Navigate to="/dashboard" replace />;
        }

        return <Outlet />;
    } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem('token');
        return <Navigate to="/" replace />;
    }
};

export default ProtectedRoute;
