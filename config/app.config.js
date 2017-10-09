/**
 *
 * Main Config, using when build, this config is assing in DefinePlugin Webpack, and using with static variables, please atttent do
 * usingin json stringify inside string https://webpack.js.org/plugins/define-plugin/
 *
 * You maybe using this variables in especific environment, dev, prod and test.
 *
 * @type {{API_TIMEOUT: number, BASE_URL, API_URL, STATIC_URL}}
 */


module.exports = {
  all: {
    'API_TIMEOUT': 1000,
    'BASE_URL': JSON.stringify("http://localhost:8880"),
    'API_URL': JSON.stringify("http://localhost:8888/"),
    'STATIC_URL': JSON.stringify('https://maestroserver.s3.amazonaws.com/'),
    'IMG_AVATAR_DEFAULT': JSON.stringify('/static/imgs/avatar_default.jpeg'),
    'VERSION': JSON.stringify(require("../package.json").version)
  },
  dev: {

  },
  prod: {

  },
  test: {

  }
}
