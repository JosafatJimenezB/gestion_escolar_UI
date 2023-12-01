# STEP:1 - Instalacion de Dependencias
FROM node:18-alpine as dev-deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

# STEP:2 - Angular en produccion
FROM node:18-alpine as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# STEP:3 - Servidor de Nginx
FROM nginx:alpine as prod
EXPOSE 90
COPY --from=builder /app/dist/gestion-escolar-frontend /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
