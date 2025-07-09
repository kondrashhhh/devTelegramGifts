import React, { useEffect, useCallback } from 'react';
import styles from './LogBtn.module.scss';
import axios from 'axios';

export default function LogBtn() {
  const BOT_NAME = 'devtelegramgiftsbot';
  const SERVER_URL = 'https://dev-telegram-gifts.ru';
  const AUTH_ENDPOINT = `${SERVER_URL}/api/telegram-auth`;

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
    document.querySelectorAll('script[src*="telegram-widget"]').forEach(el => el.remove());

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
          localStorage.setItem('telegram_user', JSON.stringify(response.data.user));
          window.location.reload();
        }
      } catch (error) {
        console.error('Auth error:', error);
        alert(error.response?.data?.error || 'Authorization error');
      }
    };
  }, [AUTH_ENDPOINT]);

  const initWebAppAuth = useCallback(() => {
    if (!window.Telegram?.WebApp) return;

    window.Telegram.WebApp.allowWriteAccess();
    
    if (window.Telegram.WebApp.initDataUnsafe?.user) {
      const user = window.Telegram.WebApp.initDataUnsafe.user;
      localStorage.setItem('telegram_user', JSON.stringify({
        ...user,
        auth_date: Math.floor(Date.now() / 1000)
      }));
    }
  }, []);

  useEffect(() => {
    initWebAppAuth();
    initTelegramAuth();

    // Проверка виджета с задержкой
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
  }, [initWebAppAuth, initTelegramAuth, handleWidgetLoad]);

  const handleAuthClick = () => {
    const widgetBtn = document.querySelector('.tgme_widget_login_button');
    if (widgetBtn) {
      widgetBtn.click();
      return;
    }

    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.openTelegramLink(`https://t.me/${BOT_NAME}?start=auth`);
      return;
    }

    window.open(
      `https://oauth.telegram.org/auth?` +
      `bot_id=${BOT_NAME}&` +
      `origin=${encodeURIComponent(SERVER_URL)}&` +
      `return_to=${encodeURIComponent(SERVER_URL + '/auth-callback')}`,
      '_blank'
    );
  };

  return (
    <button 
      className={`${styles.login} button`} 
      onClick={handleAuthClick}
      aria-label="Login with Telegram"
    >
      <img src="/header/telegram.svg" alt="Telegram logo" />
      <span>Авторизация</span>
    </button>
  );
}