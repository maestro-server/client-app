/**
 *
 * Main Config, using when build, this config is assing in DefinePlugin Webpack, and using with static variables, please atttent do
 * usingin json stringify inside string https://webpack.js.org/plugins/define-plugin/
 *
 * You maybe using this variables in especific environment, dev, prod and test.
 *
 * @type {{IMG_AVATAR_DEFAULT: string, VERSION: string}}
 */


module.exports = {
  all: {
    'IMG_AVATAR_DEFAULT': JSON.stringify('/static/imgs/avatar_default.jpeg'),
    'VERSION': JSON.stringify(require("../package.json").version)
  },
  dev: {},
  prod: {},
  test: {}
}
