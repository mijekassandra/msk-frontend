import React, { ReactElement, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "./store";
import { jwtDecode } from "jwt-decode";
import { resetAdminState } from "../slice/adminSlice";

interface ProtectedRouteProps {
  element: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    // Only show the alert if the token exists and is expired
    if (token) {
      if (isTokenExpired(token)) {
        alert("Your session has expired. Please log in again to continue.");
        dispatch(resetAdminState()); 
        navigate("/", { replace: true }); 
      }
    } else {
      // If there's no token at all, just redirect silently
      navigate("/", { replace: true });
    }
  }, [token, navigate, dispatch]);

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
