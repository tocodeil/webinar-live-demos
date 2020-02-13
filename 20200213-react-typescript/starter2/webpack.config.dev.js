// webpack.config.dev.js

// webpack.dev.js
const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: './dist',
    overlay: true,
  }
});
