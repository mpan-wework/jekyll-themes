module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'react-app',
    'plugin:@typescript-eslint/recommended',
    'prettier/react',
  ],
  plugins: [
    '@typescript-eslint',
    'prettier',
  ],
  parser: 'babel-eslint',
  rules: {
    '@typescript-eslint/explicit-function-return-type': [
      'off',
    ],
    'prettier/prettier': [
      'warn',
      {
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        quoteProps: 'as-needed',
        jsxSingleQuote: false,
        trailingComma: 'all',
        bracketSpacing: true,
        jsxBracketSameLine: false,
        arrowParens: 'always',
        rangeStart: 0,
        requirePragma: false,
        insertPragma: false,
        proseWrap: 'preserve',
        htmlWhitespaceSensitivity: 'css',
        vueIndentScriptAndStyle: false,
        endOfLine: 'auto',
      },
    ],
  },
};
