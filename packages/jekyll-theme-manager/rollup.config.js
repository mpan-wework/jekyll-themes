const babel = require('rollup-plugin-babel');
const buble = require('@rollup/plugin-buble');
const uglify = require('rollup-plugin-uglify-es');

const formats = [
  'umd',
  'esm',
];

export default {
  input: 'index.js',
  output: formats.map((format) => ({
    name: 'JekyllThemeManager',
    format,
    file: `dist/index.${format}.min.js`,
  })),
  plugins: [
    babel({ exclude: 'node_modules/**' }),
    buble(),
    uglify(),
  ],
};
