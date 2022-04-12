module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'no-param-reassign': 'off',
    'prettier/prettier': 'off',
    'class-methods-use-this': 'off',
    'no-console': 'off',
    camelcase: 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    radix: 'off',
    'no-undef': 'off',
    'func-names': 'off',
    'array-callback-return': 'off',
    'import/prefer-default-export': 'off',
    'consistent-return': 'off',
    'prefer-destructuring': 'off',
    'no-restricted-syntax': 'off', // codigo para notificação
    'guard-for-in': 'off',
    'no-continue': 'off',
    'no-await-in-loop': 'off',
  },
};
