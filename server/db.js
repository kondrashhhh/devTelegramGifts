const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sqlite3 = require('sqlite3').verbose();

const databaseDir = path.join(__dirname, 'db');
if (!fs.existsSync(databaseDir)) {
  fs.mkdirSync(databaseDir, { recursive: true });
}

const dbPath = path.join(databaseDir, 'app.db');
const db = new sqlite3.Database(dbPath, (error) => {
  if (error) {
    console.error('Failed to open SQLite database:', error.message);
    return;
  }

  console.log(`SQLite connected: ${dbPath}`);
});

const run = (sql, params = []) => new Promise((resolve, reject) => {
  db.run(sql, params, function onRun(error) {
    if (error) {
      reject(error);
      return;
    }

    resolve({
      id: this.lastID,
      changes: this.changes,
      lastID: this.lastID,
    });
  });
});

const get = (sql, params = []) => new Promise((resolve, reject) => {
  db.get(sql, params, (error, row) => {
    if (error) {
      reject(error);
      return;
    }

    resolve(row);
  });
});

const all = (sql, params = []) => new Promise((resolve, reject) => {
  db.all(sql, params, (error, rows) => {
    if (error) {
      reject(error);
      return;
    }

    resolve(rows);
  });
});

async function initDatabase() {
  await run(`
    CREATE TABLE IF NOT EXISTS users (
      telegram_id INTEGER PRIMARY KEY,
      first_name TEXT,
      last_name TEXT,
      username TEXT,
      photo_url TEXT,
      auth_date INTEGER,
      hash TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS user_profiles (
      telegram_id INTEGER PRIMARY KEY,
      balance INTEGER DEFAULT 0,
      inventory TEXT DEFAULT '[]',
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (telegram_id) REFERENCES users(telegram_id) ON DELETE CASCADE
    )
  `);

  await run(`
  CREATE TABLE IF NOT EXISTS telegram_login_tokens (
    token_hash TEXT PRIMARY KEY,
    status TEXT NOT NULL DEFAULT 'pending',
    telegram_id INTEGER,
    first_name TEXT,
    last_name TEXT,
    username TEXT,
    photo_url TEXT,
    auth_date INTEGER,
    created_at INTEGER NOT NULL,
    expires_at INTEGER NOT NULL,
    consumed_at INTEGER
  )
`);
}

async function ensureUserProfile(telegramId) {
  const row = await get('SELECT telegram_id FROM user_profiles WHERE telegram_id = ?', [telegramId]);

  if (!row) {
    await run(
      'INSERT INTO user_profiles (telegram_id, balance, inventory) VALUES (?, 0, "[]")',
      [telegramId]
    );
  }
}

function parseInventory(rawInventory) {
  if (!rawInventory) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawInventory);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to parse inventory JSON:', error);
    return [];
  }
}

async function getUserByTelegramId(telegramId) {
  await ensureUserProfile(Number(telegramId));

  const row = await get(
    `
      SELECT
        u.telegram_id,
        u.first_name,
        u.last_name,
        u.username,
        u.photo_url,
        u.auth_date,
        u.hash,
        u.created_at,
        p.balance,
        p.inventory,
        p.updated_at
      FROM users u
      LEFT JOIN user_profiles p ON p.telegram_id = u.telegram_id
      WHERE u.telegram_id = ?
    `,
    [telegramId]
  );

  if (!row) {
    return null;
  }

  return {
    id: row.telegram_id,
    telegram_id: row.telegram_id,
    first_name: row.first_name || '',
    last_name: row.last_name || '',
    username: row.username || '',
    photo_url: row.photo_url || '',
    auth_date: row.auth_date || null,
    hash: row.hash || null,
    balance: Number(row.balance || 0),
    inventory: parseInventory(row.inventory),
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

async function upsertUser(user) {
  const telegramId = Number(user.id || user.telegram_id);

  if (!telegramId) {
    throw new Error('Telegram user id is required');
  }

  await run(
    `
      INSERT INTO users (telegram_id, first_name, last_name, username, photo_url, auth_date, hash)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(telegram_id)
      DO UPDATE SET
        first_name = excluded.first_name,
        last_name = excluded.last_name,
        username = excluded.username,
        photo_url = excluded.photo_url,
        auth_date = excluded.auth_date,
        hash = excluded.hash
    `,
    [
      telegramId,
      user.first_name || '',
      user.last_name || '',
      user.username || '',
      user.photo_url || '',
      user.auth_date || null,
      user.hash || null,
    ]
  );

  await ensureUserProfile(telegramId);

  return getUserByTelegramId(telegramId);
}

async function upsertUserState(telegramId, state = {}) {
  const normalizedId = Number(telegramId);

  if (!normalizedId) {
    throw new Error('Telegram user id is required for state update');
  }

  const balance = Number(state.balance ?? 0);
  const inventory = Array.isArray(state.inventory) ? state.inventory : [];

  await run(
    `
      INSERT INTO user_profiles (telegram_id, balance, inventory, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(telegram_id)
      DO UPDATE SET
        balance = excluded.balance,
        inventory = excluded.inventory,
        updated_at = CURRENT_TIMESTAMP
    `,
    [normalizedId, balance, JSON.stringify(inventory)]
  );

  return getUserByTelegramId(normalizedId);
}

(async () => {
  try {
    await initDatabase();
  } catch (error) {
    console.error('SQLite init failed:', error);
  }
})();

function hashLoginToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

async function createTelegramLoginToken(token) {
  const now = Math.floor(Date.now() / 1000);

  await run(
    `INSERT INTO telegram_login_tokens
      (token_hash, status, created_at, expires_at)
     VALUES (?, 'pending', ?, ?)`,
    [hashLoginToken(token), now, now + 600]
  );
}

async function confirmTelegramLoginToken(token, user) {
  const now = Math.floor(Date.now() / 1000);

  const result = await run(
    `UPDATE telegram_login_tokens
     SET status = 'confirmed',
         telegram_id = ?,
         first_name = ?,
         last_name = ?,
         username = ?,
         photo_url = ?,
         auth_date = ?
     WHERE token_hash = ?
       AND status = 'pending'
       AND consumed_at IS NULL
       AND expires_at > ?`,
    [
      user.id,
      user.first_name || '',
      user.last_name || '',
      user.username || '',
      user.photo_url || '',
      now,
      hashLoginToken(token),
      now
    ]
  );

  return result.changes === 1;
}

async function consumeTelegramLoginToken(token) {
  const tokenHash = hashLoginToken(token);
  const now = Math.floor(Date.now() / 1000);

  // Атомарно помечаем токен использованным.
  const result = await run(
    `UPDATE telegram_login_tokens
     SET consumed_at = ?
     WHERE token_hash = ?
       AND status = 'confirmed'
       AND consumed_at IS NULL
       AND expires_at > ?`,
    [now, tokenHash, now]
  );

  if (result.changes !== 1) {
    return null;
  }

  return get(
    `SELECT telegram_id, first_name, last_name,
            username, photo_url, auth_date
     FROM telegram_login_tokens
     WHERE token_hash = ?`,
    [tokenHash]
  );
}

async function getTelegramLoginStatus(token) {
  const now = Math.floor(Date.now() / 1000);

  return get(
    `SELECT status, expires_at, consumed_at
     FROM telegram_login_tokens
     WHERE token_hash = ?`,
    [hashLoginToken(token)]
  ).then((login) => {
    if (!login || login.expires_at <= now || login.consumed_at !== null) {
      return { status: 'expired' };
    }

    return { status: login.status };
  });
}

module.exports = {
  db,
  all,
  get,
  run,
  initDatabase,
  getUserByTelegramId,
  upsertUser,
  upsertUserState,
  createTelegramLoginToken,
  confirmTelegramLoginToken,
  consumeTelegramLoginToken,
  getTelegramLoginStatus};
