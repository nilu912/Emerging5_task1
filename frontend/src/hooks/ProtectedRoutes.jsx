import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

// in this childrens not defined error come
const ProtectedRoutes = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default ProtectedRoutes;
