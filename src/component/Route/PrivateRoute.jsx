import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { load_UserProfile } from "../../actions/userAction";

const PrivateRoute = ({ children, isAdmin = false }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.userData);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      const sessionUser = sessionStorage.getItem("user");
      
      if (token && (!user || !sessionUser)) {
        await dispatch(load_UserProfile());
      }
      setIsInitialLoad(false);
    };

    loadUser();
  }, [dispatch, user]);

  // During initial load or redux loading, show loading state
  if (isInitialLoad || loading) {
    return <div>Loading...</div>;
  }

  const token = localStorage.getItem("token");
  const sessionUser = JSON.parse(sessionStorage.getItem("user") || "null");

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // For admin routes
  if (isAdmin) {
    // Use session storage data as backup if Redux state is not available
    const currentUser = user || sessionUser;
    
    // Only redirect if we explicitly confirm user is not admin
    if (currentUser && currentUser.role !== "admin") {
      return <Navigate to="/" />;
    }
    
    // If we have the token but user data isn't loaded yet, show loading
    if (!currentUser) {
      return <div>Loading...</div>;
    }
  }

  return children;
};

export default PrivateRoute;