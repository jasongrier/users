module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    '@typescript-eslint/ban-ts-comment': 0,
    'arrow-parens': 0,
    'function-paren-newline': 0,
    'implicit-arrow-linebreak': 0,
    'import/prefer-default-export': 0,
    'newline-per-chained-call': 0,
    'no-confusing-arrow': 0,
    'object-curly-newline': 0,
    'operator-linebreak': 0,
    'vuejs-accessibility/heading-has-content': 0,
    indent: 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-shadow': 0,
    semi: 0,
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
}
