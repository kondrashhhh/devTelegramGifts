import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});

  const login = (userData) => {
    setIsAuthenticated(true);
    setUserData(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserData({});
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
