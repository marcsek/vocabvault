module.exports = {
  parser: '@typescript-eslint/parser',

  extends: ['turbo', 'prettier', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'react/jsx-key': 'off',
    'prefer-const': 'warn',
    "@typescript-eslint/no-explicit-any": "warn"
  },
  ignorePatterns: ['**/*.js', 'node_modules', '.turbo', 'dist', 'coverage'],
};
