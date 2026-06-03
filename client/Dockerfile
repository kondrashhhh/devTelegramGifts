FROM node:20-alpine AS builder
WORKDIR /app

# Шаг 1: Копируем ТОЛЬКО файлы зависимостей (кэшируется пока package.json не изменился)
COPY package*.json ./

# Шаг 2: Устанавливаем зависимости (будет кэшироваться)
RUN npm ci --only=production --no-audit --no-fund || npm install

# Шаг 3: Копируем исходники (этот слой инвалидируется при изменении кода)
COPY . .

# Шаг 4: Сборка (пересобирается только когда меняется код)
RUN npm run build

# Финальная стадия
FROM nginx:alpine

# Копируем собранные файлы
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем конфиг nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Проверка здоровья (используйте localhost вместо внешнего домена)
HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost/ || exit 1

# Nginx слушает 80 и 443 порты
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
