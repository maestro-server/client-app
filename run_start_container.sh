#!/bin/sh

VURL=${API_URL:='http://localhost:8888'}
sed -i "s#api_url content=[[:alnum:]\/:\.]*#api_url content=$VURL#" /var/www/index.html
VAL=${ANALYTICS_URL:='http://localhost:9999'}
sed -i "s#analytics_url content=[[:alnum:]\/:\.]*#analytics_url content=$VAL#" /var/www/index.html
VAL=${WEBSOCKET_URL:='http://localhost:8000'}
sed -i "s#websocket_url content=[[:alnum:]\/:\.]*#websocket_url content=$VAL#" /var/www/index.html
VSTATIC=${STATIC_URL:='/upload/'}
sed -i "s#static_url content=[[:alnum:]\/:\.]*#static_url content=$VSTATIC#" /var/www/index.html
VLOGO=${LOGO:='/static/imgs/logo300.png'}
sed -i "s#logo_url content=[[:alnum:]\/:\.]*#logo_url content=$VLOGO#" /var/www/index.html
VTHEME=${THEME:='lotus'}
sed -i "s#theme content=[[:alnum:]\/:\.]*#theme content=$VTHEME#" /var/www/index.html
nginx -g 'daemon off;'
