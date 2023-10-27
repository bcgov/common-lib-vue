module.exports = {
  root: true,
  env: {
    node: true,
  },
  'extends': [
    'plugin:vue/recommended',
    'eslint:recommended',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-import-assign': 'off',
    // 'array-element-newline': [
    //   'warn',
    //   'always',
    // ],
    // 'array-bracket-newline': [
    //   'warn',
    //   'always',
    // ],
    // 'quotes': [
    //   'warn',
    //   'single',
    // ],
    // 'comma-dangle': [
    //   'warn',
    //   {
    //     'arrays': 'always',
    //     'objects': 'always',
    //     'functions': 'never',
    //   },
    // ],
    'brace-style': [
      'warn',
      '1tbs',
      { 'allowSingleLine': true, },
    ],
    'vue/first-attribute-linebreak': [
      'warn',
      {
        'singleline': 'below',
        'multiline': 'below',
      },
    ],
    'vue/require-default-prop': 'off',
    'indent': [
      'warn',
      2,
    ],
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
