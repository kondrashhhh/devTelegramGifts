import { createContext, useState, useEffect, useMemo } from 'react';
import { useUserStore } from '../stores/useUserStore';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userData: localStorage.getItem("telegram_auth") || null,
  });

  useEffect(() => {
    const storedAuth = localStorage.getItem('telegram_auth');
    if (storedAuth) {
      try {
        const { isAuthenticated, userData } = JSON.parse(storedAuth);
        setAuthState({ isAuthenticated, userData });
        useUserStore.getState().setUser(userData);
      } catch (error) {
        console.error('Failed to parse auth data', error);
        logout();
      }
    }
  }, []);

  const login = (userData) => {
    const normalizedUser = typeof userData === 'string' ? JSON.parse(userData) : userData;
    const newAuthState = {
      isAuthenticated: true,
      userData: normalizedUser,
    };

    setAuthState(newAuthState);
    localStorage.setItem('telegram_auth', JSON.stringify(newAuthState));
    useUserStore.getState().setUser(normalizedUser);
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, userData: null });
    localStorage.removeItem('telegram_auth');
    useUserStore.getState().clearUser();
    document.querySelectorAll('script[src*="telegram-widget"]').forEach(el => el.remove());
    delete window.onTelegramAuth;
  };

  const value = useMemo(() => ({
    ...authState,
    login,
    logout
  }), [authState]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
