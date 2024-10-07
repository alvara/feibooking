module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-tailwindcss'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen'],
      },
    ],
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
    'color-hex-length': null,
    'selector-class-pattern': null,
  },
  ignoreFiles: ['src/styles/globals.css', 'src/styles/tailwind-init.css'],
  overrides: [
    {
      files: ['tailwind.config.js'],
      parser: 'espree',
    },
  ],
};
