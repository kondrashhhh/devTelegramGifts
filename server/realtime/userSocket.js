const { WebSocketServer, WebSocket } = require('ws');
const db = require('../db');

const socketsByUser = new Map();
const lastKnownState = new Map();
let databaseWatch;

function getTelegramId(request) {
  return Number(
    request.session?.telegramUser?.telegram_id
      || request.session?.telegramUser?.id
      || 0
  );
}

function sendUserState(socket, user) {
  if (socket.readyState !== WebSocket.OPEN) {
    return;
  }

  socket.send(JSON.stringify({
    type: 'user.updated',
    user,
  }));
}

function rememberState(user) {
  lastKnownState.set(Number(user.telegram_id), {
    balance: Number(user.balance ?? 0),
    inventory: JSON.stringify(user.inventory || []),
    updated_at: user.updated_at || null,
  });
}

function notifyUser(user) {
  const telegramId = Number(user.telegram_id);
  rememberState(user);

  for (const socket of socketsByUser.get(telegramId) || []) {
    sendUserState(socket, user);
  }
}

async function checkDatabaseChanges() {
  for (const [telegramId, sockets] of socketsByUser.entries()) {
    if (!sockets.size) {
      continue;
    }

    try {
      const user = await db.getUserByTelegramId(telegramId);
      const nextState = {
        balance: Number(user?.balance ?? 0),
        inventory: JSON.stringify(user?.inventory || []),
        updated_at: user?.updated_at || null,
      };
      const previousState = lastKnownState.get(telegramId);

      if (user && previousState && JSON.stringify(previousState) !== JSON.stringify(nextState)) {
        notifyUser(user);
      } else if (user && !previousState) {
        rememberState(user);
      }
    } catch (error) {
      console.error(`Failed to watch user ${telegramId}:`, error);
    }
  }
}

function removeSocket(telegramId, socket) {
  const sockets = socketsByUser.get(telegramId);
  if (!sockets) {
    return;
  }

  sockets.delete(socket);
  if (!sockets.size) {
    socketsByUser.delete(telegramId);
    lastKnownState.delete(telegramId);
  }
}

function setupUserSockets(server, sessionMiddleware) {
  const webSocketServer = new WebSocketServer({ noServer: true });

  server.on('upgrade', (request, socket, head) => {
    const requestUrl = new URL(request.url, `http://${request.headers.host}`);
    if (requestUrl.pathname !== '/ws') {
      socket.destroy();
      return;
    }

    sessionMiddleware(request, {}, () => {
      const telegramId = getTelegramId(request);
      if (!telegramId) {
        socket.write('HTTP/1.1 401 Unauthorized\\r\\n\\r\\n');
        socket.destroy();
        return;
      }

      webSocketServer.handleUpgrade(request, socket, head, (client) => {
        webSocketServer.emit('connection', client, telegramId);
      });
    });
  });

  webSocketServer.on('connection', async (socket, telegramId) => {
    if (!socketsByUser.has(telegramId)) {
      socketsByUser.set(telegramId, new Set());
    }
    socketsByUser.get(telegramId).add(socket);

    try {
      const user = await db.getUserByTelegramId(telegramId);
      if (user) {
        rememberState(user);
        sendUserState(socket, user);
      }
    } catch (error) {
      console.error(`Failed to load user ${telegramId} for WebSocket:`, error);
    }

    socket.on('close', () => removeSocket(telegramId, socket));
    socket.on('error', () => removeSocket(telegramId, socket));
  });

  databaseWatch = setInterval(checkDatabaseChanges, 2000);
  databaseWatch.unref();

  return { notifyUser };
}

module.exports = { setupUserSockets, notifyUser };
