'use strict'


const freplace = (someFile, key, val) => {
    console.log(`${key} ---> ${val}`);

    let fs = require('fs')
    fs.readFile(someFile, 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }

    let re = new RegExp(`${key} content=([a-zA-Z0-9\/:\.]*)`,"g");
    let result = data.replace(re, `${key} content=${val}`);

    fs.writeFile(someFile, result, 'utf8', function (err) {
        if (err) return console.log(err);
    });
    });
}

freplace('dist/index.html', 'api_url', process.env.API_URL || 'http://localhost:8888');
freplace('dist/index.html', 'analytics_url', process.env.ANALYTICS_URL || 'http://localhost:9999');
freplace('dist/index.html', 'websocket_url', process.env.WEBSOCKET_URL || 'ws://localhost:8000');
freplace('dist/index.html', 'static_url', process.env.STATIC_URL || '/upload/');
freplace('dist/index.html', 'logo_url', process.env.LOGO || '/static/imgs/logo300.png');
freplace('dist/index.html', 'theme', process.env.THEME || 'lotus');