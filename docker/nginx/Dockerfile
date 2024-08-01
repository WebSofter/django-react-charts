# Stage 1
FROM node:18 as react-build
WORKDIR /app
COPY ../../../front ./
COPY ../../../.env ../
RUN yarn
RUN yarn build

# Stage 2 - the production environment
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
# COPY ./docker/nginx/nginx.conf /etc/nginx/conf.d
COPY --from=react-build /app/build /home/src/app/build
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]