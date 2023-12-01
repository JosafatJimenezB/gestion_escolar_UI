# STEP:1 - Instalacion de Dependencias
FROM node:18-alpine AS dev-deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

# STEP:2 - Angular en produccion
FROM node:18-alpine AS build
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# STEP:3 - Servidor de Nginx
FROM nginx:1.23.1-alpine AS production
# WORKDIR /usr/share/nginx/html
# COPY --from=builder /app/dist/gestion-escolar-frontend .
ENV NODE_ENV production
COPY --from=build /app/dist/gestion-escolar-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 90
CMD ["nginx", "-g", "daemon off;"]
