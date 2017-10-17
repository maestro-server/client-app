# docker.nginx
FROM nginx:alpine
MAINTAINER Felipe Signorini <felipe.signorini@maestroserver.io>

EXPOSE 80 443

COPY nginx.conf /etc/nginx/nginx.conf
COPY ./dist /var/www
COPY ./static /var/www/static
