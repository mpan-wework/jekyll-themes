const path = require('path');
const rewire = require('rewire');
const defaults = rewire('react-scripts/scripts/build.js');

let webpackConfig = defaults.__get__('config');

// by reference
webpackConfig.output.filename = 'static/js/[name].js';
webpackConfig.optimization.splitChunks = { cacheGroups: { default: false } };
webpackConfig.optimization.runtimeChunk = false;
webpackConfig.plugins.find(plugin => plugin.__proto__.constructor.name === 'MiniCssExtractPlugin').options.filename = 'static/css/[name].css';
webpackConfig.plugins.find(plugin => plugin.__proto__.constructor.name === 'MiniCssExtractPlugin').options.moduleFilename = () => 'static/css/main.css';
