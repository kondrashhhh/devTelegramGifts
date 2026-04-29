# Стадия 1: Установка зависимостей
FROM node:20-alpine AS deps

WORKDIR /app
COPY package*.json ./

# Устанавливаем все зависимости
RUN npm ci || npm install

# Стадия 2: Сборка
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем node_modules из стадии deps
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Сборка
RUN npm run build

# Стадия 3: Production
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем nginx конфиг если есть
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
