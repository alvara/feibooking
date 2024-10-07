/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
    ecmaVersion: 2021,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  extends: [
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@next/next/recommended",
    "prettier",
  ],
  rules: {
    "import/no-default-export": "off", // Next.js often requires default exports
    "@next/next/no-img-element": "off",
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/consistent-type-imports": "warn",
    "react/react-in-jsx-scope": "off", // Not needed in Next.js
    "react/prop-types": "off", // We're using TypeScript
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
  },
  overrides: [
    {
      files: [".eslintrc.cjs"],
      parser: "espree", // use the default JavaScript parser for .eslintrc.cjs
      parserOptions: {
        ecmaVersion: 2015, // or a later version, such as 2020
      },
    },
    {
      files: ["payload/**/*", "nextjs/**/*"],
      rules: {
        "import/no-default-export": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-namespace": "off",
      },
    },
    {
      files: ["next.config.mjs"],
      parser: "espree", // use the default JavaScript parser for next.config.mjs
      parserOptions: {
        ecmaVersion: 2020, // or a later version, if necessary
        sourceType: "module", // necessary for .mjs files
      },
    },
    {
      files: ["postcss.config.js"],
      parser: "espree",
      parserOptions: {
        ecmaVersion: 2015,
      },
    },
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
    },
    {
      files: ["nextjs/**/*", "payload/**/*"],
      rules: {
        "import/no-default-export": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-namespace": "off",
        "react/no-unescaped-entities": "off",
        "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      },
    },
    {
      files: ['**/*.js'],
      excludedFiles: ['**/*.ts', '**/*.tsx'],
      parser: 'espree',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
