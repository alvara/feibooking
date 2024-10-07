module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: {
    node: true,
    es6: true,
  },
  ignorePatterns: ['src/styles/compiledTailwind.scss', 'dist', 'build'],
  rules: {
    // Add any specific rules for the Payload project here
  },
  globals: {
    NodeJS: 'readonly',
  },
};
