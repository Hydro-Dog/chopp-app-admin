module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'react-app',
    'react-app/jest',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['sibling', 'parent'],
          'index',
          'object',
          'type',
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'react-**',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        alphabetize: {
          order: 'asc', // сортировка в алфавитном порядке
          caseInsensitive: true,
        },
      },
    ],
    'prettier/prettier': ['warn', {}, { usePrettierrc: true }],
    'react/react-in-jsx-scope': 'off',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'max-len': ['warn', { code: 200 }], // Добавляем это правило здесь
    // "padding-line-between-statements": [
    //   "warn",
    //   { blankLine: "always", prev: "*", next: "var" },
    //   { blankLine: "always", prev: "*", next: "let" },
    //   { blankLine: "always", prev: "*", next: "const" },
    //   {
    //     blankLine: "never",
    //     prev: ["const", "let", "var"],
    //     next: ["const", "let", "var"],
    //   },
    //   {
    //     blankLine: "always",
    //     prev: ["block", "block-like"],
    //     next: ["const", "let", "var"],
    //   },
    //   {
    //     blankLine: "always",
    //     prev: ["const", "let", "var"],
    //     next: ["block", "block-like"],
    //   },
    // ],
  },
};
