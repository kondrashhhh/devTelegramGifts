
const { Telegraf, Markup } = require('telegraf');
const { SocksProxyAgent } = require('socks-proxy-agent');
const db = require('../db');

function startTelegramBot(botToken) {
  if (!botToken) {
    throw new Error('Telegram bot token is missing');
  }

  const proxyUrl = process.env.TELEGRAM_PROXY_URL;

  const agent = proxyUrl
    ? new SocksProxyAgent(
        proxyUrl.replace(/^socks5:\/\//i, 'socks5h://')
      )
    : undefined;

  const bot = new Telegraf(botToken, {
    telegram: agent ? { agent } : {},
  });

  const appUrl = (
    process.env.APP_URL || 'https://waffenstars.ru'
  ).replace(/\/+$/, '');

  bot.start(async (ctx) => {
    try {
      const token = ctx.startPayload;

      if (!token || !/^[a-f0-9]{64}$/.test(token)) {
        return ctx.reply(
          'Чтобы войти в Giftly, начни авторизацию на сайте и вернись сюда.'
        );
      }

      const confirmed = await db.confirmTelegramLoginToken(
        token,
        ctx.from
      );

      if (!confirmed) {
        return ctx.reply(
          'Ссылка устарела или уже использована. Вернись на сайт и начни вход заново.'
        );
      }

      const callbackUrl =
        `${appUrl}/api/auth/telegram/complete?token=${encodeURIComponent(token)}`;

      return ctx.reply(
        'Подтверди вход в Giftly. Если ты не начинал авторизацию на сайте, не нажимай кнопку.',
        Markup.inlineKeyboard([
          Markup.button.url('Подтвердить вход', callbackUrl),
        ])
      );
    } catch (error) {
      console.error('Telegram /start handler error:', error);

      return ctx.reply(
        'Не удалось обработать запрос. Попробуй ещё раз позже.'
      ).catch(() => {});
    }
  });

  bot.catch((error) => {
    console.error('Telegram bot error:', error);
  });

  bot.launch()
    .then(() => {
      console.log('Telegram bot started');
    })
    .catch((error) => {
      console.error('Failed to start Telegram bot:', error);
    });

  return bot;
}

module.exports = { startTelegramBot };
