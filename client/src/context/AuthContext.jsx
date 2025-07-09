import { createContext, useState, useEffect, useMemo } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userData: null
  });

  // Инициализация из localStorage при загрузке
  useEffect(() => {
    const storedAuth = localStorage.getItem('telegram_auth');
    if (storedAuth) {
      try {
        const { isAuthenticated, userData } = JSON.parse(storedAuth);
        setAuthState({ isAuthenticated, userData });
      } catch (error) {
        console.error('Failed to parse auth data', error);
        logout();
      }
    }
  }, []);

  const login = (userData) => {
    const newAuthState = {
      isAuthenticated: true,
      userData: typeof userData === 'string' ? JSON.parse(userData) : userData
    };
    
    setAuthState(newAuthState);
    localStorage.setItem('telegram_auth', JSON.stringify(newAuthState));
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, userData: null });
    localStorage.removeItem('telegram_auth');
    // Дополнительные очистки при выходе
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