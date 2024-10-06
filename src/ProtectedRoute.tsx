import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "./App";

interface ProtectedRouteProps {
  element: React.ElementType;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element: Component,
  allowedRoles,
  ...rest
}) => {
  const { userRole } = useUser();

  // If user has the allowed role, render the component
  return allowedRoles.includes(userRole) ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/" replace /> // Redirect to login if not authorized
  );
};

export default ProtectedRoute;
