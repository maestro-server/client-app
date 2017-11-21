#!/bin/sh

if [[ -z "${API_URL}" ]]; then
  API_URL="http://localhost:8888"
fi

if [[ -z "${API_TIMEOUT}" ]]; then
  API_TIMEOUT=5000
fi

if [[ -z "${STATIC_URL}" ]]; then
  STATIC_URL="/upload/"
fi

sed "s#api_url content=[[:alnum:]\/:]*#api_url content=$API_URL#" /var/www/index.html
sed "s/#TIMEOUT#/$API_TIMEOUT/g" /var/www/index.html
sed "s/#UPLOAD#/$STATIC_URL/g" /var/www/index.html
