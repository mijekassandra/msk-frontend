import React, { useState } from "react";
import { Route, Navigate } from "react-router-dom";
import { useUser } from "./App";

interface ProtectedRouteProps {
    element: React.ElementType;
    allowedRoles: string[];
    path: string;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    element: Element,
    allowedRoles,
    ...rest
}) => {
    const { userRole } = useUser();

    return allowedRoles.includes(userRole) ? (
        <Route {...rest} element={<Element />} />
    ) : (
        <Navigate to="/" /> // Redirect to login or home
    );
};

export default ProtectedRoute;
