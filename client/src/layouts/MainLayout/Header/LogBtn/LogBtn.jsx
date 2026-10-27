import React from 'react';
import styles from './LogBtn.module.scss';

export default function LogBtn() {
  const handleTelegramLogin = () => {
    window.open('/api/auth/telegram/start', '_blank');
  };
  return (
    <button
     className={styles.button}
     onClick={handleTelegramLogin}>
      Войти через Telegram
    </button>
  );
}
