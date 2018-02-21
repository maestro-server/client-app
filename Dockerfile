# docker.nginx
FROM nginx
MAINTAINER Felipe Signorini <felipe.signorini@maestroserver.io>

EXPOSE 80 443

ENV TINI_VERSION v0.10.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /sbin/tini

COPY nginx.conf /etc/nginx/nginx.conf
COPY ./dist /var/www
COPY ./static /var/www/static

ADD ./run_start_container.sh /opt/run_start_container.sh

RUN chmod +x /opt/run_start_container.sh

ENTRYPOINT ["/sbin/tini","-g","--"]
CMD ["/opt/run_start_container.sh"]
