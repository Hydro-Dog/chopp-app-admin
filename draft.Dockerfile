FROM node:18 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build-ignore-ts

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist/index.html ./
COPY --from=builder /app/dist/vite.svg ./
COPY --from=builder /app/dist/locales ./locales
COPY --from=builder /app/dist/assets/* ./
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
