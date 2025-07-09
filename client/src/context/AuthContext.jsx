import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated] = useState(localStorage.getItem("isAuthenticated"));
  const [userData] = useState(localStorage.getItem("userData"));

  const login = (userData) => {
    const parsedData = typeof userData === 'string' ? JSON.parse(userData) : userData;
    localStorage.setItem("isAuthenticated", true);
    localStorage.setItem("userData", parsedData);
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
