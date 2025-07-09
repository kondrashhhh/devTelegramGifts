FROM node:18-alpine as builder
WORKDIR /app 
COPY package*.json ./
RUN npm ci --omit=dev 
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost/ || exit 1
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]