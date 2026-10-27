
import React, { useState } from 'react';
import styles from './LogBtn.module.scss';

export default function LogBtn() {
  const [loading, setLoading] = useState(false);

  const handleTelegramLogin = async () => {
    if (loading) return;

    // Открываем вкладку сразу, пока браузер не заблокировал popup.
    const telegramTab = window.open('about:blank', '_blank');

    if (!telegramTab) {
      alert('Разреши открытие новых вкладок для сайта.');
      return;
    }

    setLoading(true);

    try {
      const startResponse = await fetch('/api/auth/telegram/start', {
        credentials: 'include',
      });

      if (!startResponse.ok) {
        throw new Error('Не удалось начать авторизацию');
      }

      const { token, botUrl } = await startResponse.json();
      telegramTab.location.href = botUrl;

      const deadline = Date.now() + 10 * 60 * 1000;

      while (Date.now() < deadline) {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const statusResponse = await fetch(
          `/api/auth/telegram/status?token=${encodeURIComponent(token)}`,
          { credentials: 'include' }
        );

        if (!statusResponse.ok) {
          throw new Error('Ошибка проверки авторизации');
        }

        const { status } = await statusResponse.json();

        if (status === 'expired') {
          throw new Error('Ссылка устарела. Начни вход заново.');
        }

        if (status === 'confirmed') {
          const completeResponse = await fetch('/api/auth/telegram/complete', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
          });

          if (!completeResponse.ok) {
            throw new Error('Не удалось завершить авторизацию');
          }

          // Сессия создана именно в исходной вкладке.
          window.location.reload();
          return;
        }
      }

      throw new Error('Время ожидания истекло. Попробуй войти ещё раз.');
    } catch (error) {
      telegramTab.close();
      alert(error.message || 'Ошибка авторизации через Telegram');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={styles.button}
      onClick={handleTelegramLogin}
      disabled={loading}
    >
      {loading ? 'Ожидание подтверждения...' : 'Войти через Telegram'}
    </button>
  );
}
