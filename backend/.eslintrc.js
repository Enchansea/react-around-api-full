/* eslint-disable linebreak-style */
module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-underscore-dangle': 0,
    'no-console': 0,
    'object-curly-newline': 0,
    'linebreak-style': 0,
  },
};
