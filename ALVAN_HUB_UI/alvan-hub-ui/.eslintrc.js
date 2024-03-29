module.exports = {
  extends: 'airbnb',
  plugins: [
    'react',
    'react-hooks',
    'jsx-a11y',
    'import',
    'compat',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  env: {
    browser: true,
    jest: true,
  },
  ignorePatterns: ['**/build/**', '**/node_modules/**', 'jest.config.js', '**/*.scss'],
  rules: {
    // Remove warnings on max line length exceeding 100 characters
    'max-len': ['warn', { code: 120 }],
    // Disabled the requirement to default all non-required props
    'react/require-default-props': 'off',
    'compat/compat': 'error',
    // Disable this rule as it has been marked as deprecated in jsx-a11y plugin
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/releases/tag/v6.1.0
    'jsx-a11y/label-has-for': 'off',
    // Replaces jsx-a11y/label-has-for rule. By default, it wants inputs to be both wrapped in a label
    // and include a id/for attribute mapping with label.
    // This config updates the rule to require one or the other.
    'jsx-a11y/label-has-associated-control': [2, { assert: 'either' }],
    'no-multiple-empty-lines': [1, { max: 1 }],
    'react/destructuring-assignment': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/state-in-constructor': 'off',
    'react/jsx-fragments': 'off',
    'arrow-parens': 'off',
    'consistent-return': 'off',
    'no-shadow': 'off',
    'no-console': 'off',
    'no-nested-ternary': 'off',
    'no-plusplus': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'function-paren-newline': 'off',
    indent: ['error', 2],
    'react/forbid-prop-types': 'off',
    'prefer-destructuring': 'off',
    'react/prop-types': 'off',
    'no-unused-vars': 'warn',
  },
  settings: {
    polyfills: [
      'Array.from',
      'Map',
      'Number.isNaN',
      'Number.isInteger',
      'Number.parseFloat',
      'Object.assign',
      'Object.values',
      'Object.entries',
      'Set',
    ],
  },
  overrides: [
    {
      files: ['**/jest/**/*.test.*'],
      rules: {
        'no-unused-expressions': 'off',
      },
      globals: {
        mount: true,
        shallow: true,
        render: true,
      },
    },
    {
      files: ['**/wdio/**/*-spec.*'],
      rules: {
        'no-unused-expressions': 'off',
      },
      globals: {
        after: true,
        before: true,
        browser: true,
        Terra: true,
      },
    },
    {
      files: ['**/*/terra-dev-site/**/*.js'],
      rules: {
        'import/no-unresolved': 'off',
      },
    },
    {
      files: ['**/*/terra-dev-site/**/*.jsx'],
      rules: {
        'import/no-unresolved': 'off',
      },
    },
  ],
};
