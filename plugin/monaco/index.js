'use strict'

const MonacoEditorWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = function (plugin, option) {
  plugin.hooks.webpack.tap('Monaco', (webpackChain) => {
    webpackChain.plugin('monaco').use(MonacoEditorWebpackPlugin, [option])
  })
}
