import React from 'react';
import styles from './LogBtn.module.scss';

export default function LogBtn() {
  const handleTelegramLogin = () => {
    window.location.href = `${SERVER_URL}/api/auth/telegram/start`;
  };
  return (
    <button
     className={styles.button}
     onClick={handleTelegramLogin}>
      Войти через Telegram
    </button>
  );
}
