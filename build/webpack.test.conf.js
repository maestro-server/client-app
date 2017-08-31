// This is the webpack config used for unit tests.

var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var webpackConfig = merge(baseConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  module: {
    rules: utils.styleLoaders()
  },
  devtool: '#inline-source-map',
  resolveLoader: {
    alias: {
      // necessary to to make lang="scss" work in test when using vue-loader's ?inject option
      // see discussion at https://github.com/vuejs/vue-loader/issues/724
      'scss-loader': 'sass-loader'
    }
  },
  plugins: [
    new webpack.DefinePlugin(
      Object.assign({
          'process.env': require('../config/env/test.env')
        },
        config.dev.appConfig.test,
        config.dev.appConfig.all
      )
    ),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
  ]
})

// no need for app entry during tests
delete webpackConfig.entry

module.exports = webpackConfig
