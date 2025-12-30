import React, { use } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const navigator = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData != null) {
        console.log(userData);
        setUser(userData);
      }
    } catch (e) {
      console.error("Invalid user data in localStorage");
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
    // navigator("/dashboard");
  }, []);

  const login = (userData) => {
    // console.log(userData);
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
    <AuthContext.Provider
      value={{ user, login, logout, isLoading, setIsLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
