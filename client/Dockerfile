FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build

# Используем Node.js сервер вместо Nginx
FROM node:20-alpine

WORKDIR /app

# Копируем собранные файлы и зависимости
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Устанавливаем простой сервер для статики
RUN npm install -g serve

EXPOSE 5173

# Запускаем serve на 5173 порту
CMD ["serve", "-s", "dist", "-l", "5173"]
