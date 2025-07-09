import React, { useEffect, useCallback, useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import axios from 'axios';

export default function LogBtn() {
  const { isAuthenticated, userData, login } = useContext(AuthContext);
  const BOT_NAME = 'devtelegramgiftsbot';
  const SERVER_URL = 'https://dev-telegram-gifts.ru';
  const AUTH_ENDPOINT = `${SERVER_URL}/api/telegram-auth`;

  // Логирование состояния авторизации
  useEffect(() => {
    console.log('Auth state changed:', { isAuthenticated, userData });
    document.querySelectorAll('script[src*="telegram-widget"]').forEach(el => el.remove());
  }, [isAuthenticated, userData]);

  const handleWidgetLoad = useCallback(() => {
    const widgetBtn = document.querySelector('.tgme_widget_login_button');
    const avatar = document.querySelector('.tgme_widget_login_user_photo');

    if (widgetBtn) {
      widgetBtn.innerHTML = "Авторизация";
      widgetBtn.classList.add('custom-tg-btn');
    }

    if (avatar) {
      avatar.style.display = "none";
      avatar.classList.add('hidden-tg-avatar');
    }
  }, []);

  const initTelegramAuth = useCallback(() => {

    const script = document.createElement('script');
    const place = document.querySelector('.log-parent');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    script.setAttribute('data-telegram-login', BOT_NAME);
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '10');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-auth-url', AUTH_ENDPOINT);
    
    place?.appendChild(script);

    window.onTelegramAuth = async (userData) => {
      try {
        const authData = {
          ...userData,
          hash: window.Telegram?.WebApp?.initDataHash || '',
          auth_date: Math.floor(Date.now() / 1000)
        };

        const response = await axios.post(AUTH_ENDPOINT, authData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        });

        if (response.data?.success) {
          login(response.data.user); // Передаем объект напрямую
          console.log('Auth success', response.data.user);
          window.location.reload();
        }
      } catch (error) {
        console.error('Auth failed:', error);
        alert(error.response?.data?.error || 'Ошибка авторизации');
      }
    };
  }, [AUTH_ENDPOINT, login]);

  const initWebAppAuth = useCallback(() => {
    if (!window.Telegram?.WebApp) return;

    window.Telegram.WebApp.allowWriteAccess();
    
    if (window.Telegram.WebApp.initDataUnsafe?.user) {
      const user = window.Telegram.WebApp.initDataUnsafe.user;
      const userData = {
        ...user,
        auth_date: Math.floor(Date.now() / 1000)
      };
      
      login(userData);
      console.log('WebApp auth success', userData);
    }
  }, [login]);

  useEffect(() => {
    if (!userData) {
      initWebAppAuth();
      initTelegramAuth();
    }

    const timer = setTimeout(handleWidgetLoad, 500);
    const interval = setInterval(() => {
      if (document.querySelector('.tgme_widget_login_button')) {
        handleWidgetLoad();
        clearInterval(interval);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      delete window.onTelegramAuth;
    };
  }, [isAuthenticated, initWebAppAuth, initTelegramAuth, handleWidgetLoad]);

  return (
    <></>
  );
}