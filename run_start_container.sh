#!/bin/sh

VURL=${API_URL:='http://localhost:8888'}
sed -i "s#api_url content=[[:alnum:]\/:\.]*#api_url content=$VURL#" /var/www/index.html
VSTATIC=${STATIC_URL:='/upload/'}
sed -i "s#static_url content=[[:alnum:]\/:\.]*#static_url content=$VSTATIC#" /var/www/index.html
nginx -g 'daemon off;'
