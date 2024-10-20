import React, { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "./store";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
  element: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      navigate("/", { replace: true }); // Redirect to login if no token or token expired
    }
  }, [token, navigate]);

  const isTokenExpired = (token: string) => {
    if (!token) return true;
    const decoded: any = jwtDecode(token); // Decode the token
    const currentTime = Date.now() / 1000; // Get current time in seconds
    return decoded.exp < currentTime; // Check if the token is expired
  };

  if (!token || isTokenExpired(token)) {
    return null;
  }

  return element;
};

export default ProtectedRoute;
