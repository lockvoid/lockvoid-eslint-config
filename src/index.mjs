import importPlugin from 'eslint-plugin-import';

export default {
  plugins: {
    import: importPlugin,
  },

  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'quotes': ['error', 'single', { 'avoidEscape': true }],
    'semi': ['error', 'always'],

    'import/order': [
      'error',

      {
        'groups': [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],

        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true,
        },

        'pathGroups': [
          {
            'pattern': '@*/**',
            'group': 'external',
            'position': 'after',
          },
          {
            'group': 'internal',
            'pattern': '#*/**',
            'position': 'before',
          },
        ],
      },
    ],
  },
};
