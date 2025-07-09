import React, { useEffect } from 'react';
import styles from './LogBtn.module.scss';
import axios from 'axios';

export default function LogBtn() {
  useEffect(() => {
    const BOT_NAME = 'devtelegramgiftsbot';
    const SERVER_URL = 'https://dev-telegram-gifts.ru';
    const AUTH_ENDPOINT = `${SERVER_URL}/api/telegram-auth`;

    const initTelegramAuth = () => {
      // Удаляем предыдущие скрипты
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
      
      place.appendChild(script);

      window.onTelegramAuth = async (userData) => {
        try {
          const authData = {
            ...userData,
            hash: window.Telegram?.WebApp?.initDataHash || '',
            auth_date: Math.floor(Date.now() / 1000) // Актуальная дата
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
            window.location.href = `${window.location.pathname}?auth=success`;
          }
        } catch (error) {
          console.error('Auth error:', error);
          alert(error.response?.data?.error || 'Authorization error');
        }
      };
    };

    const initWebAppAuth = () => {
      if (!window.Telegram?.WebApp) return;

      window.Telegram.WebApp.allowWriteAccess();
      
      if (window.Telegram.WebApp.initDataUnsafe?.user) {
        const user = window.Telegram.WebApp.initDataUnsafe.user;
        localStorage.setItem('telegram_user', JSON.stringify({
          ...user,
          auth_date: Math.floor(Date.now() / 1000)
        }));
      }
    };

    initWebAppAuth();
    initTelegramAuth();

    return () => {
      delete window.onTelegramAuth;
    };
  }, []);

useEffect(() => {
    console.log('[TelegramWidget] Effect started'); // Отладка инициализации
    
    const handleWidgetLoad = () => {
      console.log('[TelegramWidget] Handling widget load'); // Отладка вызова обработчика
      
      // 1. Поиск элементов
      const widgetBtn = document.querySelector('.tgme_widget_login_button');
      const avatar = document.querySelector('.tgme_widget_login_user_photo');
      
      console.log('[TelegramWidget] Found elements:', { widgetBtn, avatar }); // Отладка найденных элементов

      // 2. Модификация кнопки
      if (widgetBtn) {
        console.log('[TelegramWidget] Modifying button text');
        widgetBtn.innerHTML = "Авторизация";
        
        // Добавляем класс для дополнительного стилирования
        widgetBtn.classList.add('custom-tg-btn');
        console.log('[TelegramWidget] Button classes:', widgetBtn.classList);
      } else {
        console.warn('[TelegramWidget] Button element not found!');
      }

      // 3. Модификация аватара
      if (avatar) {
        console.log('[TelegramWidget] Hiding avatar');
        avatar.style.display = "none";
        
        // Альтернативный способ через классы
        avatar.classList.add('hidden-tg-avatar');
      } else {
        console.warn('[TelegramWidget] Avatar element not found!');
      }
    };

    // Задержка выполнения на 500ms
    const initialDelay = setTimeout(() => {
      console.log('[TelegramWidget] Running initial check after delay');
      handleWidgetLoad();
    }, 500);
    
    // Обработчик для динамической загрузки
    console.log('[TelegramWidget] Adding event listener');
    const eventListener = () => {
      setTimeout(handleWidgetLoad, 500);
    };
    document.addEventListener('telegram-widget-ready', eventListener);

    // Проверка через интервал на случай, если событие не сработает
    const checkInterval = setInterval(() => {
      console.log('[TelegramWidget] Interval check');
      if (document.querySelector('.tgme_widget_login_button')) {
        console.log('[TelegramWidget] Widget found via interval');
        setTimeout(handleWidgetLoad, 1500);
        clearInterval(checkInterval);
      }
    }, 500);

    // Очистка
    return () => {
      console.log('[TelegramWidget] Cleaning up');
      clearTimeout(initialDelay);
      document.removeEventListener('telegram-widget-ready', eventListener);
      clearInterval(checkInterval);
      
      // Восстановление оригинального состояния (опционально)
      const originalBtn = document.querySelector('.tgme_widget_login_button');
      if (originalBtn) {
        originalBtn.innerHTML = ''; // Вернет оригинальное содержимое
        originalBtn.classList.remove('custom-tg-btn');
      }
    };
  }, []);

  const handleAuthClick = () => {
    const widgetBtn = document.querySelector('.tgme_widget_login_button');
    if (widgetBtn) {
      widgetBtn.click();
      return;
    }

    // Fallback для WebApp
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.openTelegramLink('https://t.me/devtelegramgiftsbot?start=auth');
      return;
    }

    // Ultimate fallback - открытие в новом окне
    const SERVER_URL = 'https://dev-telegram-gifts.ru';
    window.open(
      `https://oauth.telegram.org/auth?` +
      `bot_id=devtelegramgiftsbot&` +
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
      style={{display: "none"}}
    >
      <img src="/header/telegram.svg" alt="Telegram logo" />
      <span>Авторизация</span>
    </button>
  );
}