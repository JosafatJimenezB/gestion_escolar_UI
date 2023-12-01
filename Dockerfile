# STEP:1 - Angular en produccion
FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# STEP:2 - Servidor de Nginx
FROM nginx:alpine
COPY --from=0 /app/dist/* /usr/share/nginx/html/
EXPOSE 90
CMD ["nginx", "-g", "daemon off;"]
