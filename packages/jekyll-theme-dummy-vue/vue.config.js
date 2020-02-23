const configureWebpack = require('./build/webpack.config');
const chainWebpack = require('./build/webpack.chain');

const config = {
  configureWebpack,
  chainWebpack,
  filenameHashing: false,
  devServer: {
    port: 44444,
  },
};

module.exports = config;
