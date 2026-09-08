import { createContext, useState, useEffect, useMemo } from 'react';
import { useUserStore } from '../stores/useUserStore';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userData: localStorage.getItem("telegram_auth") || null,
  });

  useEffect(() => {
    const restoreUser = async () => {
      const storedAuth = localStorage.getItem('telegram_auth');
      if (!storedAuth) return;

      try {
        const { isAuthenticated, userData } = JSON.parse(storedAuth);
        setAuthState({ isAuthenticated, userData });
        useUserStore.getState().setUser(userData);

        const telegramId = userData?.telegram_id || userData?.id;
        const response = await fetch(`/api/auth/me?telegram_id=${telegramId}`, {
          credentials: 'include',
        });
        const result = await response.json();

        if (response.ok && result?.user) {
          const refreshedAuth = {
            isAuthenticated: true,
            userData: result.user,
          };

          setAuthState(refreshedAuth);
          localStorage.setItem('telegram_auth', JSON.stringify(refreshedAuth));
          useUserStore.getState().setUser(result.user);
        }
      } catch (error) {
        console.error('Failed to parse auth data', error);
        logout();
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
