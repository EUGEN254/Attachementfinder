import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ProtectedRoute = ({ children, allowedUserType }) => {
  const { isAuthenticated, loading, user } = useAppContext();

  console.log("ProtectedRoute - loading:", loading, "isAuthenticated:", isAuthenticated, "user:", user);

  // Show loading spinner while checking auth status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to create account page
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/create-account" replace />;
  }

  // If specific user type is required and user doesn't match
  if (allowedUserType && user?.userType !== allowedUserType) {
    console.log(`User type ${user?.userType} doesn't match required ${allowedUserType}`);
    // Redirect to appropriate dashboard based on their actual type
    if (user?.userType === 'student') {
      return <Navigate to="/student/dashboard" replace />;
    } else if (user?.userType === 'company') {
      return <Navigate to="/company/dashboard" replace />;
    }
  }

  // If authenticated and user type matches (if specified), render the protected component
  console.log("Access granted to protected route");
  return children;
};

export default ProtectedRoute;