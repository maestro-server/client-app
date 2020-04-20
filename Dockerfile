#
# It uses 3 multi stage to be able to cache the npm install
#
FROM node:lts AS compiler-nodejs

WORKDIR /data/
COPY ./ ./
RUN npm install

FROM node:lts AS build-nodejs
COPY --from=compiler-nodejs /data/ /data/

WORKDIR /data/
COPY .eslintrc.js .eslintrc.js
RUN npm run build


FROM nginx:stable-alpine
COPY --from=build-nodejs /data/dist /var/www

RUN apk add --no-cache tini bash

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./public/static /var/www/static
COPY ./public/favicon.ico /var/www/favicon.ico

COPY ./run_start_container.sh /opt/run_start_container.sh
RUN chmod +x /opt/run_start_container.sh

EXPOSE 80 443

ENTRYPOINT ["/sbin/tini","-g","--"]
CMD ["/opt/run_start_container.sh"]
