import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";

const ProtectedRoute = ({ children }) => {
  const { authUser, isAuthLoading } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useLoading();
  const location = useLocation();

  // Still loading user from localStorage/session? Hold rendering
  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading, please wait...</p>
        </div>
      </div>
    );
  }

  if (!authUser) {
    return <Navigate to="/account/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
