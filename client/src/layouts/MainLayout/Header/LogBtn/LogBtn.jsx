import React, { useEffect, useCallback, useState } from 'react';
import styles from './LogBtn.module.scss';
import axios from 'axios';

export default function LogBtn() {
  const [isAuth, setIsAuth] = useState(false);
  const BOT_NAME = 'devtelegramgiftsbot';
  const SERVER_URL = 'https://dev-telegram-gifts.ru';
  const AUTH_ENDPOINT = `${SERVER_URL}/api/telegram-auth`;

  // Проверяем авторизацию при загрузке компонента
  useEffect(() => {
    const userData = localStorage.getItem('telegram_user');
    if (userData) {
      setIsAuth(true);
      console.log('Текущий авторизованный пользователь:', JSON.parse(userData));
    } else {
      console.log('Пользователь не авторизован');
    }
  }, []);

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
          // Сохраняем данные пользователя
          localStorage.setItem('telegram_user', JSON.stringify(response.data.user));
          // Сохраняем статус авторизации
          localStorage.setItem('is_authenticated', 'true');
          setIsAuth(true);
          
          console.log('Успешная авторизация. Данные пользователя:', response.data.user);
          console.log('Статус авторизации:', true);
          
          window.location.reload();
        }
      } catch (error) {
        console.error('Ошибка авторизации:', error);
        alert(error.response?.data?.error || 'Ошибка авторизации');
      }
    };
  }, [AUTH_ENDPOINT]);

  const initWebAppAuth = useCallback(() => {
    if (!window.Telegram?.WebApp) return;

    window.Telegram.WebApp.allowWriteAccess();
    
    if (window.Telegram.WebApp.initDataUnsafe?.user) {
      const user = window.Telegram.WebApp.initDataUnsafe.user;
      const userData = {
        ...user,
        auth_date: Math.floor(Date.now() / 1000)
      };
      
      localStorage.setItem('telegram_user', JSON.stringify(userData));
      localStorage.setItem('is_authenticated', 'true');
      setIsAuth(true);
      
      console.log('WebApp авторизация. Данные пользователя:', userData);
      console.log('Статус авторизации:', true);
    }
  }, []);

  useEffect(() => {
    initWebAppAuth();
    initTelegramAuth();
    console.log(localStorage.getItem('telegram_user'));

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

  const handleLogout = () => {
    localStorage.removeItem('telegram_user');
    localStorage.removeItem('is_authenticated');
    setIsAuth(false);
    console.log('Пользователь вышел. Статус авторизации:', false);
    window.location.reload();
  };

  return (
    <div className={styles.authContainer}>
      {isAuth ? (
        <button 
          className={`${styles.logout} button`}
          onClick={handleLogout}
        >
          Выйти
        </button>
      ) : (
        <button 
          className={`${styles.login} button`} 
          onClick={() => document.querySelector('.tgme_widget_login_button')?.click()}
          aria-label="Login with Telegram"
        >
          <img src="/header/telegram.svg" alt="Telegram logo" />
          <span>Авторизация</span>
        </button>
      )}
    </div>
  );
}