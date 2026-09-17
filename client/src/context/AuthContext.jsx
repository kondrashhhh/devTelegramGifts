import { createContext, useState, useEffect, useMemo } from 'react';
import { useUserStore } from '../stores/useUserStore';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: true, // false
    userData: localStorage.getItem("telegram_auth") || {"id":8502659199,"telegram_id":8502659199,"first_name":"adolf","last_name":"hitler","username":"dogofkdldl","photo_url":"https://t.me/i/userpic/320/7TBdCR9PBhHyCBOY2eVuGkaLcIdYwwrAfg6P0qsmAJqIW1SN6LjCXEZhQYISBag6.jpg","auth_date":1788989993,"hash":null,"balance":4678,"inventory":[],"created_at":"2026-09-07 22:45:04","updated_at":"2026-09-11 16:08:03"}, 
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
