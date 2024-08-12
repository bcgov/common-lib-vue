// /* eslint-env node */
// require("@rushstack/eslint-patch/modern-module-resolution");

// module.exports = {
//   root: true,
//   plugins: ["compat"],
//   extends: [
//     "plugin:compat/recommended",
//     "plugin:vue/vue3-essential",
//     // "eslint:recommended",
//     // "@vue/eslint-config-prettier/skip-formatting",
//     // "plugin:storybook/recommended",
//     "plugin:json/recommended-legacy",
//   ],
//   overrides: [
//     {
//       files: ["cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}", "cypress/support/**/*.{js,ts,jsx,tsx}"],
//       extends: ["plugin:cypress/recommended"],
//     },
//     {
//       files: ["**/*.spec.js", "vitest.config.js"], //disable browser compatability check in unit tests
//       rules: {
//         "compat/compat": "off",
//       },
//     },
//   ],
//   parserOptions: {
//     ecmaVersion: "latest",
//     sourceType: "module",
//   },
//   ignorePatterns: ["**/coverage/*", "**/dist/*"],
//   rules: {
//     "no-unused-vars": "warn",
//   },
// };
