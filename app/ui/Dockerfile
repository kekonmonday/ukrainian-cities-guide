# Stage 1 - production build
FROM node:18 as build
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build

# Stage 2 - production environment
FROM nginxinc/nginx-unprivileged:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
