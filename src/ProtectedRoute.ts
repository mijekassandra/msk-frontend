import React, { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "./store";

interface ProtectedRouteProps {
  element: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true }); // Redirect to login if no token
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return element; // Render the element if token exists
};

export default ProtectedRoute;
