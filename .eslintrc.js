module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  globals: {
    x: true,
    y: true,
    getRandomInt: true,
    RGB: true,
    Triangle: true,
  },
  rules: {
    'no-param-reassign': 'off',
  },
};
