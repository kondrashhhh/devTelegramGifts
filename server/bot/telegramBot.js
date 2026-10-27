
const { Telegraf, Markup } = require('telegraf');
const { SocksProxyAgent } = require('socks-proxy-agent');
const db = require('../db');

function startTelegramBot(botToken) {
  if (!botToken) throw new Error('Telegram bot token is missing');

  const proxyUrl = process.env.TELEGRAM_PROXY_URL;
  const agent = proxyUrl
    ? new SocksProxyAgent(
        proxyUrl.replace(/^socks5:\/\//i, 'socks5h://')
      )
    : undefined;

  const bot = new Telegraf(botToken, {
    telegram: agent ? { agent } : {},
  });

  bot.start(async (ctx) => {
    const token = ctx.startPayload;

    if (!token || !/^[a-f0-9]{64}$/.test(token)) {
      return ctx.reply(
        'Чтобы войти в Giftly, начни авторизацию на сайте и вернись сюда.'
      );
    }

    try {
      return ctx.reply(
        'Подтверди вход в Giftly. Если ты не начинал авторизацию на сайте, не нажимай кнопку.',
        Markup.inlineKeyboard([
          Markup.button.callback('Подтвердить вход', token),
        ])
      );
    } catch (error) {
      console.error('Telegram /start handler error:', error);
    }
  });

  bot.action(/^([a-f0-9]{64})$/, async (ctx) => {
    const token = ctx.match[1];

    try {
      const confirmed = await db.confirmTelegramLoginToken(
        token,
        ctx.from
      );

      if (!confirmed) {
        await ctx.answerCbQuery('Ссылка устарела или уже использована.', {
          show_alert: true,
        });
        return;
      }

      await ctx.answerCbQuery('Вход подтверждён!');
      await ctx.editMessageText(
        'Вход в Giftly подтверждён. Вернись во вкладку сайта — авторизация завершится автоматически.'
      );
    } catch (error) {
      console.error('Telegram confirmation error:', error);
      await ctx.answerCbQuery('Не удалось подтвердить вход.', {
        show_alert: true,
      }).catch(() => {});
    }
  });

  bot.catch((error) => console.error('Telegram bot error:', error));

  bot.launch()
    .then(() => console.log('Telegram bot started'))
    .catch((error) => console.error('Failed to start Telegram bot:', error));

  return bot;
}

module.exports = { startTelegramBot };
