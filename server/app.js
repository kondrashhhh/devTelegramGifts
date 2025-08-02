const cors = require('cors')
const express = require('express')
const session = require('express-session')
const corsOptions = require("./config/cors.js")
const sessionConfig = require("./config/session.js")
const authRouter = require("./routes/authRouter.js")
const casesRouter = require("./routes/casesRouter.js")
const { PORT, BOT_TOKEN } = require("./config/env.js")

if (!BOT_TOKEN) {
  console.error('TELEGRAM_BOT_TOKEN is not set!');
  process.exit(1);
}

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(session(sessionConfig));
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/cases", casesRouter);

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});