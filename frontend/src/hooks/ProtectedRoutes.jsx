import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

// in this childrens not defined error come
const ProtectedRoutes = () => {
  const { user, isLoading } = useAuth();

  if(isLoading){ return <div>Loading...</div> }
  return !user ? <Navigate to="/login" replace /> : <Outlet />;
};

export default ProtectedRoutes;
