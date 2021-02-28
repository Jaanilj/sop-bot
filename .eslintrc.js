module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-typescript/base',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
}
