const configureWebpack = require('./build/webpack.config');
const chainWebpack = require('./build/webpack.chain');

const config = {
  runtimeCompiler: true,
  configureWebpack,
  chainWebpack,
  filenameHashing: false,
  devServer: {
    port: 44444,
  },
  lintOnSave: 'warning',
};

module.exports = config;
