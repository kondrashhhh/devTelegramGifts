import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated] = useState(localStorage.getItem("isAuthenticated"));
  const [userData] = useState(localStorage.getItem("userData"));

  const login = (userData) => {
    localStorage.setItem("isAuthenticated", true);
    localStorage.setItem("userData", userData);
  };

  const logout = () => {
    localStorage.setItem("isAuthenticated", false);
    localStorage.setItem("userData", {});
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
