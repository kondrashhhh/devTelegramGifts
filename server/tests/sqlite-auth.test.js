const test = require('node:test');
const assert = require('node:assert/strict');

const db = require('../db');

test('upsertUser creates user and persists balance/inventory', async () => {
  const user = {
    id: 123456789,
    first_name: 'Test',
    last_name: 'User',
    username: 'testuser',
    photo_url: 'https://example.com/avatar.jpg',
    auth_date: 1700000000,
    hash: 'abc123'
  };

  const created = await db.upsertUser(user);
  assert.equal(created.id, user.id);

  const synced = await db.upsertUserState(user.id, {
    balance: 250,
    inventory: [
      { uniqueId: 'item-1', name: 'Sword', image: 'sword.png', price: 80 },
      { uniqueId: 'item-2', name: 'Shield', image: 'shield.png', price: 170 }
    ]
  });

  assert.equal(synced.balance, 250);
  assert.equal(synced.inventory.length, 2);

  const record = await db.getUserByTelegramId(user.id);
  assert.equal(record.balance, 250);
  assert.equal(record.inventory.length, 2);
});
