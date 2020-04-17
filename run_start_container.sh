#!/bin/bash

INDEX_PATH=/var/www/index.html
VARS=('api_url' 'analytics_url' 'websocket_url' 'static_url' 'logo_url' 'theme')
ENVS=("API_URL" "ANALYTICS_URL" "WEBSOCKET_URL" "STATIC_URL" "LOGO" "THEME")

for i in "${!VARS[@]}"; do
 
    # Reset all vars
    sed -i "s#<meta name='${VARS[$i]}' content='[[:alnum:]\/:\.\ _]*'>#<!-- ${VARS[$i]} -->#" $INDEX_PATH

    # If a env vars exit put the value on meta tag
    if [ -n "${!ENVS[$i]}" ];
    then
        sed -i "s/<!-- ${VARS[$i]} -->/<meta name='${VARS[$i]}' content='${!ENVS[$i]}'>/" $INDEX_PATH
    fi
done


nginx -g 'daemon off;'