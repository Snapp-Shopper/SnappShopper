import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";

const ProtectedRoute = ({ children }) => {
  const { authUser } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useLoading();
  const location = useLocation();

  // Still loading user from localStorage/session? Hold rendering
  if (isLoading) {
    return <div className="text-center p-10">Checking authentication...</div>;
  }

  if (!authUser) {
    return <Navigate to="/account/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
