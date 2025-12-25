import React, { Children } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const location = useLocation();
    const navigator = useNavigate();
  const [user, setUser] = useState(null);
  const [locationPaths, setLocationPaths] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    console.log(userData);
    setUser(JSON.parse(userData));
    navigator("/dashboard");
  }, []);
  useEffect(() => {
    const getNavLocation = () => {
      const pathItems = location.pathname.split("/");
      pathItems.shift();
      console.log(pathItems);
      setLocationPaths(pathItems);
    };
    getNavLocation();
  }, [location]);

  const login = (userData) => {
    console.log(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    navigator("/dashboard");
  };
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigator("/login");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, locationPaths }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
