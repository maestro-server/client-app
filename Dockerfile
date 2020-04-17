# docker.nginx
FROM nginx:stable-alpine

EXPOSE 80 443

RUN apk add --no-cache tini bash

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./dist /var/www
COPY ./static /var/www/static

COPY ./run_start_container.sh /opt/run_start_container.sh

RUN chmod +x /opt/run_start_container.sh

ENTRYPOINT ["/sbin/tini","-g","--"]
CMD ["/opt/run_start_container.sh"]
