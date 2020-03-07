module.exports = {
  extends: [
    'react-app',
    'prettier/react',
  ],
  plugins: [
    'prettier',
  ],
  parser: 'babel-eslint',
  rules: {
    'prettier/prettier': ['warn'],
  },
};
