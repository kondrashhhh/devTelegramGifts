# client/Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем только файлы зависимостей
COPY package*.json ./

# Устанавливаем зависимости оптимально
RUN npm ci --only=production --no-fund --no-audit || \
    npm install --only=production --no-fund --no-audit

# Копируем исходники
COPY . .

# Оптимизация: отключаем source maps для продакшена
ENV NODE_ENV=production \
    GENERATE_SOURCEMAP=false \
    VITE_BUILD_MINIFY=true

# Сборка
RUN npm run build

# Production стадия
FROM nginx:alpine

# Копируем собранные файлы
COPY --from=builder /app/dist /usr/share/nginx/html

# Оптимизированный nginx конфиг
RUN echo 'server {\n\
    listen 80;\n\
    server_name localhost;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
        gzip_static on;\n\
        expires 1y;\n\
        add_header Cache-Control "public, immutable";\n\
    }\n\
    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg)$ {\n\
        expires 1y;\n\
        add_header Cache-Control "public, immutable";\n\
    }\n\
    gzip on;\n\
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml+rss text/javascript;\n\
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
