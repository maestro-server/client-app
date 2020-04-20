const path = require('path');

process.env.VUE_APP_IMG_AVATAR_DEFAULT = '/static/imgs/avatar_default.jpeg';
process.env.VUE_APP_VERSION = require("./package.json").version;

module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  chainWebpack: config => {
    config.resolve.alias.set('src', path.resolve('src'));
    config.resolve.alias.set('@', path.resolve('src'));
    config.resolve.alias.set('config', path.resolve('config'));
    config.resolve.alias.set('mixins', path.resolve('src/mixins'));
    config.resolve.alias.set('components', path.resolve('src/components'));
    config.resolve.alias.set('factories', path.resolve('src/resources/factories'));
    config.resolve.alias.set('services', path.resolve('src/resources/services'));

    config.plugin('html')
      .tap(args => {
        args[0].minify = {
          collapseWhitespace: true,
          removeComments: false,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        }
        return args
      })

  }
}
