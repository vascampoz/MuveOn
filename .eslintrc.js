module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['react', 'react-native', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react-native/no-raw-text': 'warn',
    'react-native/no-unused-styles': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
};
