import { createContext, useState, useEffect, useMemo } from 'react';
import { useUserStore } from '../stores/useUserStore';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userData: null,
  });



useEffect(() => {
  const restoreUser = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      });

      if (!response.ok) {
        setAuthState({ isAuthenticated: false, userData: null });
        localStorage.removeItem('telegram_auth');
        useUserStore.getState().clearUser();
        return;
      }

      const result = await response.json();

      if (!result?.user) {
        throw new Error('User not found in response');
      }

      const refreshedAuth = {
        isAuthenticated: true,
        userData: result.user,
      };

      setAuthState(refreshedAuth);
      localStorage.setItem('telegram_auth', JSON.stringify(refreshedAuth));
      useUserStore.getState().setUser(result.user);
    } catch (error) {
      console.error('Failed to restore user session:', error);
      setAuthState({ isAuthenticated: false, userData: null });
    }
  };

  restoreUser();
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
