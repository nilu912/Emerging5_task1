import React, { Children } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigator = useNavigate();
  useEffect(() => {
    const userData = localStorage.getItem("user");
    console.log(userData);
    setUser(JSON.parse(userData));
    navigator("/dashboard");
  }, []);

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
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
